import { FLAG_DELETION, $FRAGMENT, FLAG_PLACEMENT, FLAG_UPDATE, $ERROR_BOUNDARY, $CONTEXT, } from "../constants.js";
import { createElement } from "../index.js";
import { KiruError } from "../error.js";
import { node } from "../globals.js";
export { cloneElement, isVNodeDeleted, isElement, isVNode, isValidTextChild, isExoticType, isFragment, isLazy, isContextProvider, vNodeContains, getCurrentVNode, getVNodeApp, commitSnapshot, traverseApply, findParent, findParentErrorBoundary, assertValidElementProps, normalizeElementKey, createVNodeId, registerVNodeCleanup, propsChanged, depthSort, };
function cloneElement(vNode) {
    const children = vNode.props.children;
    let clonedChildren;
    if (isVNode(children)) {
        clonedChildren = cloneElement(children);
    }
    else if (Array.isArray(children)) {
        clonedChildren = children.map((c) => (isVNode(c) ? cloneElement(c) : c));
    }
    return createElement(vNode.type, { ...vNode.props, children: clonedChildren });
}
function isVNodeDeleted(vNode) {
    return (vNode.flags & FLAG_DELETION) !== 0;
}
function isVNode(thing) {
    return typeof thing === "object" && thing !== null && "type" in thing;
}
function isElement(thing) {
    return typeof thing === "object" && thing !== null && "type" in thing;
}
function isValidTextChild(thing) {
    return ((typeof thing === "string" && thing !== "") ||
        typeof thing === "number" ||
        typeof thing === "bigint");
}
function isExoticType(type) {
    return type === $FRAGMENT || type === $CONTEXT || type === $ERROR_BOUNDARY;
}
function isFragment(vNode) {
    return vNode.type === $FRAGMENT;
}
function isLazy(vNode) {
    return (typeof vNode.type === "function" &&
        "displayName" in vNode.type &&
        vNode.type.displayName === "Kiru.lazy");
}
function isContextProvider(thing) {
    return isVNode(thing) && thing.type === $CONTEXT;
}
function getCurrentVNode() {
    return node.current;
}
function getVNodeApp(vNode) {
    let n = vNode;
    while (n) {
        if (n.app) {
            return (vNode.app = n.app);
        }
        n = n.parent;
    }
    return null;
}
function commitSnapshot(vNode) {
    const { props, key, index } = vNode;
    vNode.prev = { props, key, index };
    vNode.flags &= ~(FLAG_UPDATE | FLAG_PLACEMENT | FLAG_DELETION);
}
function vNodeContains(haystack, needle) {
    if (needle.depth < haystack.depth)
        return false;
    if (haystack === needle)
        return true;
    let checkSiblings = false;
    const stack = [haystack];
    while (stack.length) {
        const n = stack.pop();
        if (n === needle)
            return true;
        n.child && stack.push(n.child);
        checkSiblings && n.sibling && stack.push(n.sibling);
        checkSiblings = true;
    }
    return false;
}
function traverseApply(vNode, func) {
    func(vNode);
    let child = vNode.child;
    while (child) {
        func(child);
        if (child.child) {
            traverseApply(child, func);
        }
        child = child.sibling;
    }
}
function findParent(vNode, predicate) {
    let n = vNode.parent;
    while (n) {
        if (predicate(n))
            return n;
        n = n.parent;
    }
    return null;
}
function findParentErrorBoundary(vNode) {
    return findParent(vNode, (n) => n.type === $ERROR_BOUNDARY);
}
function assertValidElementProps(vNode) {
    if ("children" in vNode.props && vNode.props.innerHTML) {
        throw new KiruError({
            message: "Cannot use both children and innerHTML on an element",
            vNode,
        });
    }
    for (const key in vNode.props) {
        if ("bind:" + key in vNode.props) {
            throw new KiruError({
                message: `Cannot use both bind:${key} and ${key} on an element`,
                vNode,
            });
        }
    }
}
function normalizeElementKey(thing) {
    if (thing === undefined)
        return null;
    if (typeof thing === "string" || typeof thing === "number") {
        return thing;
    }
    return null;
}
function createVNodeId(vNode) {
    const accumulator = [];
    let n = vNode;
    while (n) {
        accumulator.push(n.index);
        accumulator.push(n.depth);
        n = n.parent;
    }
    return `k:${BigInt(accumulator.join("")).toString(36)}`;
}
function registerVNodeCleanup(vNode, id, callback) {
    ;
    (vNode.cleanups ?? (vNode.cleanups = {}))[id] = callback;
}
function propsChanged(oldProps, newProps, keysToSkip) {
    const aKeys = Object.keys(oldProps);
    const bKeys = Object.keys(newProps);
    if (aKeys.length !== bKeys.length)
        return true;
    for (let key of aKeys) {
        if (keysToSkip?.includes(key))
            continue;
        if (oldProps[key] !== newProps[key])
            return true;
    }
    return false;
}
function depthSort(a, b) {
    return a.depth - b.depth;
}
//# sourceMappingURL=vdom.js.map