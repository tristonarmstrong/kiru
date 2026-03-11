import { createKiruGlobalContext } from "./globalContext.js";
import { isBrowser } from "./env.js";
export * from "./signals/index.js";
export * from "./action.js";
export * from "./appHandle.js";
export * from "./components/index.js";
export * from "./context.js";
export * from "./customEvents.js";
export * from "./devtools.js";
export * from "./element.js";
export * from "./error.js";
export { onHmr } from "./hmr.js";
export * from "./hooks/index.js";
export * from "./renderToString.js";
export * from "./ref.js";
export { nextIdle, flushSync, requestUpdate, useRequestUpdate, } from "./scheduler.js";
export * from "./statefulPromise.js";
export * from "./viewTransitions.js";
if (isBrowser) {
    window.__kiru ?? (window.__kiru = createKiruGlobalContext());
}
//# sourceMappingURL=index.js.map