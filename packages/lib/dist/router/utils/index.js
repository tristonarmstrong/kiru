import { createElement } from "../../element.js";
import { __DEV__ } from "../../env.js";
export { formatViteImportMap, matchRoute, match404Route, matchLayouts, normalizePrefixPath, parseQuery, wrapWithLayouts, };
function formatViteImportMap(map, dir, baseUrl) {
    return Object.keys(map).reduce((acc, key) => {
        const dirIndex = key.indexOf(dir);
        if (dirIndex === -1) {
            if (__DEV__) {
                console.warn(`[kiru/router]: File "${key}" does not start with "${dir}".`);
            }
            return acc;
        }
        let specificity = 0;
        let k = baseUrl + key.slice(dirIndex + dir.length);
        while (k.startsWith("/")) {
            k = k.slice(1);
        }
        const segments = [];
        const parts = k.split("/").slice(0, -1);
        const params = new Set();
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.startsWith("[...") && part.endsWith("]")) {
                if (i !== parts.length - 1) {
                    throw new Error(`[kiru/router]: Catchall must be the folder name. Got "${key}"`);
                }
                const param = part.slice(4, -1);
                if (params.has(param)) {
                    throw new Error(`[kiru/router]: Duplicate parameter "${param}" in "${key}"`);
                }
                params.add(param);
                segments.push(`:${param}*`);
                specificity += 1;
                break;
            }
            if (part.startsWith("[") && part.endsWith("]")) {
                const param = part.slice(1, -1);
                if (params.has(param)) {
                    throw new Error(`[kiru/router]: Duplicate parameter "${param}" in "${key}"`);
                }
                params.add(param);
                segments.push(`:${param}`);
                specificity += 10;
                continue;
            }
            specificity += 100;
            segments.push(part);
        }
        const value = {
            filePath: key,
            load: map[key],
            params: Array.from(params),
            route: "/" + parts.join("/"),
            segments,
            specificity,
        };
        return {
            ...acc,
            [segments.join("/")]: value,
        };
    }, {});
}
function matchRoute(pages, pathSegments) {
    const matches = [];
    outer: for (const [route, pageEntry] of Object.entries(pages)) {
        const routeSegments = pageEntry.segments;
        const pathMatchingSegments = routeSegments.filter((seg) => !seg.startsWith("(") && !seg.endsWith(")"));
        const params = {};
        let hasCatchall = false;
        // Check if route matches
        for (let i = 0; i < pathMatchingSegments.length && i < pathSegments.length; i++) {
            const routeSeg = pathMatchingSegments[i];
            if (routeSeg.startsWith(":")) {
                const key = routeSeg.slice(1);
                if (routeSeg.endsWith("*")) {
                    // Catchall route - matches remaining segments
                    hasCatchall = true;
                    const catchallKey = key.slice(0, -1); // Remove the *
                    params[catchallKey] = pathSegments.slice(i).join("/");
                    break;
                }
                else {
                    // Regular dynamic segment
                    if (i >= pathSegments.length) {
                        continue outer;
                    }
                    params[key] = pathSegments[i];
                }
            }
            else {
                // Static segment
                if (routeSeg !== pathSegments[i]) {
                    continue outer;
                }
            }
        }
        // For non-catchall routes, ensure exact length match
        if (!hasCatchall && pathMatchingSegments.length !== pathSegments.length) {
            continue;
        }
        matches.push({
            route,
            pageEntry,
            params,
            routeSegments,
        });
    }
    // Sort by specificity (highest first) and return the best match
    if (matches.length === 0) {
        return null;
    }
    matches.sort((a, b) => b.pageEntry.specificity - a.pageEntry.specificity);
    return matches[0] || null;
}
function match404Route(pages, pathSegments) {
    // Try to find a 404 page at each parent directory level
    // Start from the deepest level and work up to root
    for (let i = pathSegments.length; i >= 0; i--) {
        const parentSegments = pathSegments.slice(0, i);
        const fourOhFourSegments = [...parentSegments, "404"];
        const match = matchRoute(pages, fourOhFourSegments);
        if (match) {
            return match;
        }
    }
    return null;
}
function matchLayouts(layouts, routeSegments) {
    return ["/", ...routeSegments].reduce((acc, _, i) => {
        const layoutPath = routeSegments.slice(0, i).join("/");
        const layout = layouts[layoutPath];
        if (!layout) {
            return acc;
        }
        return [...acc, layout];
    }, []);
}
function normalizePrefixPath(path) {
    while (path.startsWith(".")) {
        path = path.slice(1);
    }
    path = `/${path}/`;
    while (path.startsWith("//")) {
        path = path.slice(1);
    }
    while (path.endsWith("//")) {
        path = path.slice(0, -1);
    }
    return path;
}
function parseQuery(search) {
    const params = new URLSearchParams(search);
    const query = {};
    for (const [key, value] of params.entries()) {
        if (query[key]) {
            // Convert to array if multiple values
            if (Array.isArray(query[key])) {
                ;
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
        else {
            query[key] = value;
        }
    }
    return query;
}
function wrapWithLayouts(layouts, page, props) {
    return layouts.reduceRight((children, Layout) => createElement(Layout, { children }), createElement(page, props));
}
//# sourceMappingURL=index.js.map