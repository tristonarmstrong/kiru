import { createElement } from "../element.js";
import { useFileRouter } from "./context.js";
export const Link = ({ to, onclick, onmouseover, onfocus, replace, transition, prefetchJs, ...props }) => {
    const { navigate, prefetchRouteModules, baseUrl } = useFileRouter();
    const href = baseUrl + to;
    return createElement("a", {
        href: href,
        onclick: (e) => {
            onclick?.(e);
            if (e.defaultPrevented)
                return;
            e.preventDefault();
            navigate(href, { replace, transition });
        },
        onmouseover: (e) => {
            if (prefetchJs !== false) {
                prefetchRouteModules(href);
            }
            onmouseover?.(e);
        },
        onfocus: (e) => {
            if (prefetchJs !== false) {
                prefetchRouteModules(href);
            }
            onfocus?.(e);
        },
        ...props,
    });
};
//# sourceMappingURL=link.js.map