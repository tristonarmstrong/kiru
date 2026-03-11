import type { FormattedViteImportMap } from "../types.internal";
interface InitClientOptions {
    dir: string;
    baseUrl: string;
    pages: FormattedViteImportMap;
    layouts: FormattedViteImportMap;
    transition: boolean;
}
export declare function initClient(options: InitClientOptions): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map