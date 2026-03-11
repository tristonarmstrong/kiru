import { $FRAGMENT } from "./constants.js";
import { Fragment } from "./element.js";
export function createVNode(type, parent = null, props = {}, key = null, index = 0) {
    if (type === Fragment) {
        type = $FRAGMENT;
    }
    const depth = parent ? parent.depth + 1 : 0;
    return {
        type,
        key,
        props,
        parent,
        index,
        depth,
        flags: 0,
        child: null,
        sibling: null,
        prev: null,
        deletions: null,
    };
}
//# sourceMappingURL=vNode.js.map