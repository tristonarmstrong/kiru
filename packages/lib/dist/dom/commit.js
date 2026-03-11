import { traverseApply, commitSnapshot, getVNodeApp, setRef, call, } from "../utils/index.js";
import { FLAG_PLACEMENT, FLAG_STATIC_DOM, FLAG_UPDATE } from "../constants.js";
import { __DEV__ } from "../env.js";
import { postEffectCleanups, renderMode } from "../globals.js";
import { isHmrUpdate } from "../hmr.js";
import { unmountDomProps, updateDomProps } from "./props.js";
import { getDomParent, placeDom } from "./nodes.js";
export { commitWork, commitDeletion };
function commitWork(vNode) {
    if (renderMode.current === "hydrate") {
        return traverseApply(vNode, commitSnapshot);
    }
    const host = {
        node: vNode.dom ? vNode : getDomParent(vNode),
    };
    commitWork_impl(vNode, host, (vNode.flags & FLAG_PLACEMENT) > 0);
    if (vNode.dom && !(vNode.flags & FLAG_STATIC_DOM)) {
        commitDom(vNode, host, false);
    }
    commitSnapshot(vNode);
}
function commitWork_impl(vNode, currentHostNode, inheritsPlacement) {
    let child = vNode.child;
    while (child) {
        if (child.dom) {
            commitWork_impl(child, { node: child }, false);
            if (!(child.flags & FLAG_STATIC_DOM)) {
                commitDom(child, currentHostNode, inheritsPlacement);
            }
        }
        else {
            commitWork_impl(child, currentHostNode, (child.flags & FLAG_PLACEMENT) > 0 || inheritsPlacement);
        }
        commitSnapshot(child);
        child = child.sibling;
    }
}
function commitDom(vNode, hostNode, inheritsPlacement) {
    if (inheritsPlacement ||
        !vNode.dom.isConnected ||
        vNode.flags & FLAG_PLACEMENT) {
        placeDom(vNode, hostNode);
    }
    // During HMR we want to fully unmount previous props (events, signal
    // subscriptions, style listeners, refs, etc.) before applying the new ones,
    // so that we don't merge stale props with the new shape.
    if (__DEV__ && vNode.prev && isHmrUpdate()) {
        const { dom, prev, cleanups } = vNode;
        unmountDomProps(vNode, dom, prev.props, cleanups);
        vNode.prev = null;
    }
    if (!vNode.prev || vNode.flags & FLAG_UPDATE) {
        updateDomProps(vNode);
    }
    hostNode.lastChild = vNode.dom;
}
function commitDeletion(vNode) {
    if (vNode === vNode.parent?.child) {
        vNode.parent.child = vNode.sibling;
    }
    let app;
    if (__DEV__) {
        app = getVNodeApp(vNode);
    }
    traverseApply(vNode, (node) => {
        const { subs, cleanups, dom, props: { ref }, hooks, } = node;
        subs?.forEach((unsub) => unsub());
        if (cleanups)
            Object.values(cleanups).forEach((c) => c());
        if (hooks) {
            const { preCleanups, postCleanups } = hooks;
            postEffectCleanups.push(...postCleanups);
            preCleanups.forEach(call);
            preCleanups.length = postCleanups.length = 0;
        }
        if (__DEV__) {
            window.__kiru.profilingContext?.emit("removeNode", app);
            if (dom instanceof Element) {
                delete dom.__kiruNode;
            }
        }
        if (dom) {
            if (dom.isConnected && !(node.flags & FLAG_STATIC_DOM)) {
                dom.remove();
            }
            if (ref) {
                setRef(ref, null);
            }
            delete node.dom;
        }
    });
    vNode.parent = null;
}
//# sourceMappingURL=commit.js.map