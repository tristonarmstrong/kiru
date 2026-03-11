import { createElement, Fragment } from "./element.js";
export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
function jsx(type, { children, ...props } = {}) {
    if (!children)
        return createElement(type, props);
    return createElement(type, props, children);
}
//# sourceMappingURL=jsx.js.map