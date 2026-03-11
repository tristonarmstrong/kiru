import { $ERROR_BOUNDARY, CONSECUTIVE_DIRTY_LIMIT, FLAG_DELETION, FLAG_DIRTY, } from "./constants.js";
import { captureFocus, commitDeletion, commitWork, createDom, hydrateDom, reinstateFocus, } from "./dom/index.js";
import { assertValidElementProps, latest, traverseApply, isExoticType, getVNodeApp, findParentErrorBoundary, call, propsChanged, depthSort, } from "./utils/index.js";
import { __DEV__ } from "./env.js";
import { KiruError } from "./error.js";
import { node, postEffectCleanups, renderMode, setups } from "./globals.js";
import { hydrationStack } from "./hydration.js";
import { reconcileChildren } from "./reconciler.js";
import { isHmrUpdate } from "./hmr.js";
let app;
let treesInProgress = [];
let isRunningOrQueued = false;
let nextIdleEffects = [];
let deletions = [];
let isImmediateEffectsMode = false;
let immediateEffectDirtiedRender = false;
let isRenderDirtied = false;
let consecutiveDirtyCount = 0;
let preEffects = [];
let postEffects = [];
let animationFrameHandle = -1;
/**
 * Runs a function after any existing work has been completed,
 * or immediately if the scheduler is already idle.
 */
export function nextIdle(fn) {
    if (isRunningOrQueued) {
        nextIdleEffects.push(fn);
        return;
    }
    fn();
}
/**
 * Syncronously flushes any pending work.
 */
export function flushSync() {
    if (!isRunningOrQueued)
        return;
    window.cancelAnimationFrame(animationFrameHandle);
    doWork();
}
export function renderRootSync(rootNode) {
    rootNode.flags |= FLAG_DIRTY;
    treesInProgress.push(rootNode);
    isRunningOrQueued = true;
    flushSync();
}
/**
 * Queues a node for an update. Has no effect if the node is already deleted or marked for deletion.
 */
export function requestUpdate(vNode) {
    if (renderMode.current === "hydrate") {
        return nextIdle(() => queueUpdate(vNode));
    }
    queueUpdate(vNode);
}
export function useRequestUpdate() {
    const n = node.current;
    if (!n) {
        throw new Error("useRequestUpdate must be called inside a Kiru component");
    }
    return () => requestUpdate(n);
}
function queueUpdate(vNode) {
    // In immediate effect mode (onBeforeMount), immediately mark the render as dirty
    if (isImmediateEffectsMode) {
        immediateEffectDirtiedRender = true;
    }
    // If this node is currently being rendered, just mark it dirty
    if (node.current === vNode) {
        if (__DEV__) {
            window.__kiru.profilingContext?.emit("updateDirtied", app);
        }
        isRenderDirtied = true;
        return;
    }
    if (vNode.flags & (FLAG_DIRTY | FLAG_DELETION))
        return;
    vNode.flags |= FLAG_DIRTY;
    if (!treesInProgress.length) {
        treesInProgress.push(vNode);
        if (!isRunningOrQueued) {
            isRunningOrQueued = true;
            animationFrameHandle = window.requestAnimationFrame(doWork);
        }
        return;
    }
    treesInProgress.push(vNode);
}
function queueDelete(vNode) {
    traverseApply(vNode, (n) => (n.flags |= FLAG_DELETION));
    deletions.push(vNode);
}
let currentWorkRoot = null;
function doWork() {
    if (__DEV__) {
        const n = deletions[0] ?? treesInProgress[0];
        if (n) {
            app = getVNodeApp(n);
            window.__kiru.profilingContext?.beginTick(app);
        }
        else {
            app = null;
        }
    }
    let len = 1;
    captureFocus();
    while (treesInProgress.length) {
        if (treesInProgress.length > len) {
            treesInProgress.sort(depthSort);
        }
        currentWorkRoot = treesInProgress.shift();
        len = treesInProgress.length;
        const flags = currentWorkRoot.flags;
        if (flags & FLAG_DELETION)
            continue;
        if (flags & FLAG_DIRTY) {
            let n = currentWorkRoot;
            while ((n = performUnitOfWork(n))) { }
            while (deletions.length) {
                commitDeletion(deletions.pop());
            }
            commitWork(currentWorkRoot);
            currentWorkRoot.flags &= ~FLAG_DIRTY;
        }
    }
    reinstateFocus();
    isImmediateEffectsMode = true;
    flushEffects(preEffects);
    isImmediateEffectsMode = false;
    if (immediateEffectDirtiedRender) {
        checkForTooManyConsecutiveDirtyRenders();
        flushEffects(postEffects);
        immediateEffectDirtiedRender = false;
        consecutiveDirtyCount++;
        if (__DEV__) {
            window.__kiru.profilingContext?.endTick(app);
            window.__kiru.profilingContext?.emit("updateDirtied", app);
        }
        return flushSync();
    }
    consecutiveDirtyCount = 0;
    isRunningOrQueued = false;
    while (nextIdleEffects.length) {
        nextIdleEffects.shift()();
    }
    queueMicrotask(() => {
        flushEffects(postEffectCleanups);
        flushEffects(postEffects);
    });
    if (__DEV__) {
        window.__kiru.emit("update", app);
        window.__kiru.profilingContext?.emit("update", app);
        window.__kiru.profilingContext?.endTick(app);
    }
}
function performUnitOfWork(vNode) {
    const next = updateVNode(vNode);
    if (vNode.deletions !== null) {
        vNode.deletions.forEach(queueDelete);
        vNode.deletions = null;
    }
    if (next) {
        return next;
    }
    let nextNode = vNode;
    while (nextNode) {
        // queue effects upon ascent
        const { hooks } = nextNode;
        if (hooks) {
            preEffects.push(...hooks.pre);
            postEffects.push(...hooks.post);
            hooks.pre.length = 0;
            hooks.post.length = 0;
        }
        if (nextNode === currentWorkRoot)
            return null;
        if (nextNode.sibling) {
            return nextNode.sibling;
        }
        nextNode = nextNode.parent;
        if (renderMode.current === "hydrate" && nextNode?.dom) {
            hydrationStack.pop();
        }
    }
    return null;
}
function updateVNode(vNode) {
    const { type, props, prev, flags } = vNode;
    if (__DEV__ && isHmrUpdate()) {
    }
    else if (prev &&
        (flags & FLAG_DIRTY) === 0 &&
        (prev.props === props || !propsChanged(prev.props, props))) {
        return null;
    }
    try {
        if (typeof type === "string") {
            return updateHostComponent(vNode);
        }
        else if (isExoticType(type)) {
            return updateExoticComponent(vNode);
        }
        else {
            return updateFunctionComponent(vNode);
        }
    }
    catch (error) {
        if (__DEV__) {
            window.__kiru.emit("error", app, error instanceof Error ? error : new Error(String(error)));
        }
        const handler = findParentErrorBoundary(vNode);
        if (handler) {
            const e = (handler.error =
                error instanceof Error ? error : new Error(String(error)));
            handler.props.onError?.(e);
            if (handler.depth < currentWorkRoot.depth) {
                currentWorkRoot = handler;
            }
            return handler;
        }
        if (KiruError.isKiruError(error)) {
            if (error.customNodeStack) {
                setTimeout(() => {
                    throw new Error(error.customNodeStack);
                });
            }
            if (error.fatal) {
                throw error;
            }
            console.error(error);
            return vNode.child;
        }
        setTimeout(() => {
            throw error;
        });
    }
    return null;
}
function updateExoticComponent(vNode) {
    const { props, type } = vNode;
    let children = props.children;
    if (type === $ERROR_BOUNDARY) {
        const n = vNode;
        const { error } = n;
        if (error) {
            children =
                typeof props.fallback === "function"
                    ? props.fallback(error)
                    : props.fallback;
            delete n.error;
        }
    }
    return (vNode.child = reconcileChildren(vNode, children));
}
function updateFunctionComponent(vNode) {
    const { type, props, subs } = vNode;
    /** Only sync prop-derived signals when update came from parent (new props), not from internal subscription (e.g. signal). */
    const shouldSyncProps = (vNode.flags & FLAG_DIRTY) === 0;
    try {
        node.current = vNode;
        let newChild;
        let renderTryCount = 0;
        do {
            vNode.flags &= ~FLAG_DIRTY;
            isRenderDirtied = false;
            /**
             * remove previous signal subscriptions (if any) every render.
             * this prevents no-longer-observed signals from triggering updates
             * in components that are not currently using them.
             *
             * TODO: in future, we might be able to optimize this by
             * only clearing the subscriptions that are no longer needed
             * and not clearing the entire set.
             */
            if (subs) {
                subs.forEach(call);
                subs.clear();
            }
            if (__DEV__ && isHmrUpdate()) {
                const { hooks, cleanups } = vNode;
                if (cleanups) {
                    Object.values(cleanups).forEach(call);
                    delete vNode.cleanups;
                }
                if (hooks) {
                    const { preCleanups, postCleanups } = hooks;
                    preCleanups.forEach(call);
                    postCleanups.forEach(call);
                    preCleanups.length = postCleanups.length = 0;
                }
                delete vNode.propSyncs;
                delete vNode.render;
            }
            newChild = renderFunctionComponent(vNode, type, props, shouldSyncProps);
            if (++renderTryCount > CONSECUTIVE_DIRTY_LIMIT) {
                if (__DEV__) {
                    throw new KiruError({
                        message: "Too many re-renders. Kiru limits the number of renders to prevent an infinite loop.",
                        fatal: true,
                        vNode,
                    });
                }
                break;
            }
        } while (isRenderDirtied);
        return (vNode.child = reconcileChildren(vNode, newChild));
    }
    finally {
        node.current = null;
    }
}
function getComponentNameFromObject(compObj) {
    const hasDisplayName = "displayName" in compObj && typeof compObj.displayName === "string";
    if (hasDisplayName) {
        return compObj.displayName;
    }
    const hasRenderFunction = "render" in compObj && typeof compObj.render === "function";
    if (hasRenderFunction) {
        const renderFn = compObj.render;
        return renderFn.name;
    }
    return undefined;
}
function getVNodeName(vNode) {
    const isHtmlTag = typeof vNode.type === "string";
    if (isHtmlTag) {
        return vNode.type;
    }
    const isFunctionComponent = typeof vNode.type === "function";
    if (isFunctionComponent) {
        const fnType = vNode.type;
        return fnType.displayName || fnType.name || "Anonymous";
    }
    const isExoticSymbol = typeof vNode.type === "symbol";
    if (isExoticSymbol) {
        const symbolType = vNode.type;
        return symbolType.description || "Symbol";
    }
    return "Unknown";
}
function throwInvalidComponentError(comp, vNode) {
    let invalidComponentName = "Unknown";
    const isComponentObject = comp && typeof comp === "object";
    if (isComponentObject) {
        const compObj = comp;
        const extractedName = getComponentNameFromObject(compObj);
        if (extractedName) {
            invalidComponentName = extractedName;
        }
    }
    let formattedComponentStack = "";
    let currentNodeReference = vNode.parent;
    while (currentNodeReference) {
        const currentNodeName = getVNodeName(currentNodeReference);
        formattedComponentStack += `\n    in <${currentNodeName}>`;
        currentNodeReference = currentNodeReference.parent;
    }
    const errorMessage = `[kiru] Expected a function component but got an object. This often happens when passing a React component (like one wrapped in forwardRef) to Kiru.\n\nComponent: ${invalidComponentName}\nComponent Stack:${formattedComponentStack}`;
    throw new KiruError(errorMessage);
}
function renderFunctionComponent(vNode, type, props, shouldSyncProps) {
    const { render, propSyncs } = vNode;
    if (render) {
        if (shouldSyncProps) {
            const p = { ...props };
            propSyncs?.forEach((sync) => sync(p));
        }
        return render(props);
    }
    const comp = latest(type);
    if (typeof comp !== "function") {
        throwInvalidComponentError(comp, vNode);
    }
    let newChild = comp(props);
    if (typeof newChild === "function") {
        vNode.subs?.forEach(call); // unsub from signals observed during setup
        vNode.render = newChild;
        if (shouldSyncProps) {
            const p = { ...props };
            propSyncs?.forEach((sync) => sync(p));
        }
        newChild = newChild(props);
    }
    else if (__DEV__ && setups.has(vNode)) {
        throw new Error("setup() must not be called inside a render function");
    }
    return newChild;
}
function updateHostComponent(vNode) {
    const { props, type } = vNode;
    if (__DEV__) {
        assertValidElementProps(vNode);
    }
    if (!vNode.dom) {
        if (renderMode.current === "hydrate") {
            hydrateDom(vNode);
        }
        else {
            vNode.dom = createDom(vNode);
        }
        if (__DEV__ && vNode.dom instanceof Element) {
            vNode.dom.__kiruNode = vNode;
        }
    }
    // text should _never_ have children
    if (type !== "#text") {
        vNode.child = reconcileChildren(vNode, props.children);
        if (vNode.child && renderMode.current === "hydrate") {
            hydrationStack.push(vNode.dom);
        }
    }
    return vNode.child;
}
function checkForTooManyConsecutiveDirtyRenders() {
    if (consecutiveDirtyCount > CONSECUTIVE_DIRTY_LIMIT) {
        throw new KiruError("Maximum update depth exceeded. This can happen when a component repeatedly calls setState during render or in useLayoutEffect. Kiru limits the number of nested updates to prevent infinite loops.");
    }
}
function flushEffects(effectArr) {
    for (let i = 0; i < effectArr.length; i++) {
        effectArr[i]();
    }
    effectArr.length = 0;
}
//# sourceMappingURL=scheduler.js.map