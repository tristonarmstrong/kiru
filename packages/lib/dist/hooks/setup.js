import { signal, Signal } from "../signals/base.js";
import { createVNodeId } from "../utils/vdom.js";
import { __DEV__ } from "../env.js";
import { node, setups } from "../globals.js";
import { tracking, } from "../signals/tracking.js";
import { registerVNodeCleanup } from "../utils/index.js";
/**
 * Creates a per‑VNode setup context that can be used during
 * component setup to derive props into signals.
 *
 * @see https://kirujs.dev/docs/api/lifecycles#setup
 */
export function setup() {
    const vNode = node.current;
    if (__DEV__) {
        if (!vNode) {
            throw new Error("setup() must be called inside a Kiru component");
        }
        if (vNode.render) {
            throw new Error("setup() cannot be used inside a render function");
        }
    }
    if (setups.has(vNode)) {
        return setups.get(vNode);
    }
    const setup = createSetup(vNode);
    setups.set(vNode, setup);
    return setup;
}
function createSetup(vNode) {
    let id;
    const propSyncs = (vNode.propSyncs = []);
    let prevIndex = -1;
    // Always points at latest props (updated in propSync) so selector and subs see current props
    const currentProps = { current: { ...vNode.props } };
    const deriveCleanups = [];
    const deriveEntries = [];
    propSyncs.push((p) => {
        const old = currentProps.current;
        const skip = new Set();
        for (const entry of deriveEntries) {
            if (entry.accessedPaths.size > 0 &&
                propsUnchangedAtPaths(old, p, entry.accessedPaths)) {
                skip.add(entry);
            }
        }
        currentProps.current = p;
        for (const entry of deriveEntries) {
            if (!skip.has(entry))
                entry.run();
        }
    });
    registerVNodeCleanup(vNode, "vnode:setup", () => {
        for (const cleanup of deriveCleanups)
            cleanup();
        setups.delete(vNode);
    });
    const setupResult = {
        derive(selector) {
            const resultSig = signal(undefined);
            const unsubs = new Map();
            const accessedPaths = new Set();
            function sync() {
                accessedPaths.clear();
                const propsProxy = createPropsProxy(currentProps.current, accessedPaths);
                const observations = new Map();
                tracking.stack.push(observations);
                const value = selector(propsProxy);
                tracking.stack.pop();
                // Always assign and notify so the component re-renders when the derived value changes
                // (e.g. when parent passes a different signal ref like toggle switching count/double).
                resultSig.value = value;
                for (const [sid, unsub] of unsubs) {
                    if (!observations.has(sid)) {
                        unsub();
                        unsubs.delete(sid);
                    }
                }
                for (const [sid, observedSig] of observations) {
                    if (!unsubs.has(sid)) {
                        try {
                            unsubs.set(sid, observedSig.subscribe(sync));
                        }
                        catch {
                            // Signal may be disposed after HMR; skip subscribing
                        }
                    }
                }
            }
            sync();
            const entry = { run: sync, accessedPaths };
            deriveEntries.push(entry);
            deriveCleanups.push(() => {
                unsubs.forEach((u) => u());
                unsubs.clear();
                const i = deriveEntries.indexOf(entry);
                if (i !== -1)
                    deriveEntries.splice(i, 1);
            });
            return resultSig;
        },
        get id() {
            if (!id) {
                id = signal(createVNodeId(vNode));
                prevIndex = vNode.index;
                propSyncs.push(() => {
                    if (prevIndex !== vNode.index) {
                        id.value = createVNodeId(vNode);
                        prevIndex = vNode.index;
                    }
                });
            }
            return id;
        },
    };
    return setupResult;
}
function propsUnchangedAtPaths(oldProps, newProps, paths) {
    for (const path of paths) {
        if (!Object.is(getAtPath(oldProps, path), getAtPath(newProps, path))) {
            return false;
        }
    }
    return true;
}
function getAtPath(obj, path) {
    let cur = obj;
    for (const key of path.split(".")) {
        if (cur == null || typeof cur !== "object")
            return undefined;
        cur = cur[key];
    }
    return cur;
}
/**
 * Proxy that records paths and wraps signals. We only add to accessedPaths when
 * we hit a signal (the leaf we subscribe to), so propSync skip only compares
 * signal refs. Container objects (e.g. "data") are new every render and would
 * always fail the skip.
 */
function createPropsProxy(props, accessedPaths, pathPrefix) {
    return new Proxy(props, {
        get(holder, key) {
            const path = pathPrefix ? `${pathPrefix}.${key}` : key;
            const v = holder[key];
            if (Signal.isSignal(v)) {
                accessedPaths.add(path); // only record path for signal leaves
                return v;
            }
            if (v !== null && typeof v === "object" && !Array.isArray(v)) {
                return createPropsProxy(v, accessedPaths, path);
            }
            accessedPaths.add(path); // primitive leaf
            return v;
        },
    });
}
//# sourceMappingURL=setup.js.map