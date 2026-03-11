import { node } from "../globals.js";
export function getVNodeLifecycleHooks() {
    const vNode = node.current;
    if (!vNode)
        return null;
    return (vNode.hooks ?? (vNode.hooks = {
        pre: [],
        preCleanups: [],
        post: [],
        postCleanups: [],
    }));
}
export function wrapLifecycleHookCallback(callback, cleanups) {
    return () => {
        const cleanup = callback();
        if (typeof cleanup === "function") {
            cleanups.push(cleanup);
        }
    };
}
//# sourceMappingURL=utils.js.map