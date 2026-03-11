import type { FileRouterConfig } from "./types.js";
export interface FileRouterProps {
    /**
     * The router configuration
     * @example
     * ```ts
     *<FileRouter
         config={{
           dir: "/fbr-app", // optional, defaults to "/pages"
           baseUrl: "/app", // optional, defaults to "/"
           pages: import.meta.glob("/∗∗/index.tsx"),
           layouts: import.meta.glob("/∗∗/layout.tsx"),
           transition: true
         }}
    />
     * ```
     */
    config: FileRouterConfig;
}
export declare const FileRouter: Kiru.FC<FileRouterProps>;
//# sourceMappingURL=fileRouter.d.ts.map