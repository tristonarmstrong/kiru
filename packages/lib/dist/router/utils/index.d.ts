import type { FormattedViteImportMap, RouteMatch, ViteImportMap } from "../types.internal";
export { formatViteImportMap, matchRoute, match404Route, matchLayouts, normalizePrefixPath, parseQuery, wrapWithLayouts, };
declare function formatViteImportMap(map: ViteImportMap, dir: string, baseUrl: string): FormattedViteImportMap;
declare function matchRoute(pages: FormattedViteImportMap, pathSegments: string[]): RouteMatch | null;
declare function match404Route(pages: FormattedViteImportMap, pathSegments: string[]): RouteMatch | null;
declare function matchLayouts(layouts: FormattedViteImportMap, routeSegments: string[]): import("../types.internal").FormattedViteImportMapEntry<import("../types.internal").DefaultComponentModule>[];
declare function normalizePrefixPath(path: string): string;
declare function parseQuery(search: string): Record<string, string | string[] | undefined>;
declare function wrapWithLayouts(layouts: Kiru.FC[], page: Kiru.FC, props: Record<string, unknown>): Kiru.Element;
//# sourceMappingURL=index.d.ts.map