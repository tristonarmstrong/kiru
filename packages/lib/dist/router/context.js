import { createContext, useContext } from "../context.js";
import { __DEV__ } from "../env.js";
export const RouterContext = createContext(null);
if (__DEV__) {
    RouterContext.displayName = "RouterContext";
}
export function useFileRouter() {
    return useContext(RouterContext);
}
//# sourceMappingURL=context.js.map