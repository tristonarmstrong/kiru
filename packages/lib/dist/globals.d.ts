import { Setup } from "./hooks/index.js";
export { node, renderMode, hydrationMode, setups, postEffectCleanups };
/**
 * A reference to the current VNode (always a component) being rendered.
 */
declare const node: {
    current: Kiru.VNode | null;
};
/**
 * The current render mode. Can be "dom" "string", "stream", or "hydrate".
 */
declare const renderMode: {
    current: Kiru.RenderMode;
};
/**
 * The current hydration mode. Can be "static" or "dynamic".
 * Used to indicate whether the page being hydrated will contain streamed content.
 */
declare const hydrationMode: {
    current: "static" | "dynamic";
};
/**
 * A map of VNodes (components) to their setup functions.
 */
declare const setups: WeakMap<Kiru.VNode, Setup<any>>;
/**
 * Cleanup functions from onMount() that run after components
 * have been unmounted and the browser has painted.
 */
declare const postEffectCleanups: (() => void)[];
//# sourceMappingURL=globals.d.ts.map