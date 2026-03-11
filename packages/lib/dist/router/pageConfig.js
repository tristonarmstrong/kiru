import { __DEV__, isBrowser } from "../env.js";
import { fileRouterInstance } from "./globals.js";
export function definePageConfig(config) {
    if (__DEV__ && isBrowser) {
        const filePath = window.__kiru?.HMRContext?.getCurrentFilePath();
        const fileRouter = fileRouterInstance.current;
        if (filePath && fileRouter) {
            fileRouter.dev_onPageConfigDefined(filePath, config);
        }
    }
    return config;
}
//# sourceMappingURL=pageConfig.js.map