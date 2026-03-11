import { createElement } from "../element.js";
import { __DEV__, isBrowser } from "../env.js";
import { sideEffectsEnabled } from "../utils/runtime.js";
import { node } from "../globals.js";
import { requestUpdate } from "../scheduler.js";
const lazyCache = isBrowser
    ? // @ts-ignore - we're shamefully polluting the global scope here and hiding it 🥲
        (window.__KIRU_LAZY_CACHE ?? (window.__KIRU_LAZY_CACHE = new Map()))
    : new Map();
/**
 * Lazy loads a component and renders it when it is ready.
 * @see https://kirujs.dev/docs/components/lazy
 */
export function lazy(componentPromiseFn) {
    function LazyWrapper(props) {
        const { fallback = null, ...rest } = props;
        const nodeRef = node.current;
        if (!sideEffectsEnabled()) {
            return fallback;
        }
        const fn = removeQueryString(componentPromiseFn.toString());
        const cachedState = lazyCache.get(fn);
        if (!cachedState) {
            const promise = componentPromiseFn();
            const state = {
                promise,
                result: null,
            };
            lazyCache.set(fn, state);
            promise.then((componentOrModule) => {
                state.result =
                    typeof componentOrModule === "function"
                        ? componentOrModule
                        : componentOrModule.default;
                requestUpdate(nodeRef);
            });
            return fallback;
        }
        if (cachedState.result === null) {
            cachedState.promise.then(() => requestUpdate(nodeRef));
            return fallback;
        }
        return createElement(cachedState.result, rest);
    }
    if (__DEV__) {
        LazyWrapper.displayName = "Kiru.lazy";
    }
    return LazyWrapper;
}
/**
 * removes the query string from a function - prevents
 * vite-modified imports (eg. () => import("./Counter.tsx?t=123456"))
 * from causing issues
 */
const removeQueryString = (fnStr) => fnStr.replace(/import\((["'])([^?"']+)\?[^)"']*\1\)/g, (_, quote, path) => `import(${quote}${path}${quote})`);
//# sourceMappingURL=lazy.js.map