import { type FileRouterContextType } from "./context.js";
import type { FileRouterConfig, PageConfig } from "./types.js";
import type { DevtoolsInterface } from "./types.internal.js";
export declare class FileRouterController {
    contextValue: FileRouterContextType;
    devtools?: DevtoolsInterface;
    dev_onPageConfigDefined?: <T extends PageConfig<any>>(fp: string, config: T) => void;
    private abortController;
    private currentPage;
    private currentPageProps;
    private currentLayouts;
    private enableTransitions;
    private filePathToPageRoute?;
    private historyIndex;
    private layouts;
    private pages;
    private pageRouteToConfig?;
    private state;
    private baseUrl;
    constructor();
    init(config: FileRouterConfig): void;
    getChildren(): Kiru.Element | null;
    dispose(): void;
    private loadRoute;
    private loadRouteData;
    private invalidate;
    private navigate;
    private prefetchRouteModules;
    private setQuery;
    private setHash;
    private updateHistoryState;
    private createContextValue;
}
//# sourceMappingURL=fileRouterController.d.ts.map