import { $FRAGMENT } from "./constants.js";
import { normalizeElementKey } from "./utils/index.js";
export function createElement(type, props = null, ...children) {
    if (type === Fragment) {
        type = $FRAGMENT;
    }
    const p = props === null ? {} : props;
    const key = normalizeElementKey(p.key);
    const len = children.length;
    if (len === 1) {
        p.children = children[0];
    }
    else if (len > 1) {
        p.children = children;
    }
    return {
        type,
        key,
        props: p,
    };
}
export function Fragment({ children, key, }) {
    return {
        type: $FRAGMENT,
        key: normalizeElementKey(key),
        props: { children },
    };
}
//# sourceMappingURL=element.js.map