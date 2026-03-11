import { FormattedViteImportMap } from "../types.internal.js";
export interface RenderContext {
    baseUrl: string;
    pages: FormattedViteImportMap;
    layouts: FormattedViteImportMap;
    Document: Kiru.FC;
    registerModule: (moduleId: string) => void;
    registerPreloadedPageProps: (props: Record<string, unknown>) => void;
}
export interface RenderResult {
    status: number;
    body: string;
}
export declare function render(url: string, ctx: RenderContext, result?: RenderResult): Promise<RenderResult>;
export declare function generateStaticPaths(pages: FormattedViteImportMap): Promise<Record<string, string>>;
//# sourceMappingURL=index.d.ts.map