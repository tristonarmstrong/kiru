import { $FRAGMENT, $CONTEXT } from "../constants.js";
import type { AppHandle } from "../appHandle.js";
import type { ErrorBoundaryNode } from "../types.utils.js";
export { cloneElement, isVNodeDeleted, isElement, isVNode, isValidTextChild, isExoticType, isFragment, isLazy, isContextProvider, vNodeContains, getCurrentVNode, getVNodeApp, commitSnapshot, traverseApply, findParent, findParentErrorBoundary, assertValidElementProps, normalizeElementKey, createVNodeId, registerVNodeCleanup, propsChanged, depthSort, };
declare function cloneElement(vNode: Kiru.VNode): Kiru.Element;
declare function isVNodeDeleted(vNode: Kiru.VNode): boolean;
declare function isVNode(thing: unknown): thing is Kiru.VNode;
declare function isElement(thing: unknown): thing is Kiru.Element;
declare function isValidTextChild(thing: unknown): thing is string | number | bigint;
declare function isExoticType(type: Kiru.VNode["type"]): type is Kiru.ExoticSymbol;
declare function isFragment(vNode: Kiru.VNode): vNode is Kiru.VNode & {
    type: typeof $FRAGMENT;
};
declare function isLazy(vNode: Kiru.VNode): boolean;
declare function isContextProvider(thing: unknown): thing is Kiru.VNode & {
    type: typeof $CONTEXT;
};
declare function getCurrentVNode(): Kiru.VNode | null;
declare function getVNodeApp(vNode: Kiru.VNode): AppHandle | null;
declare function commitSnapshot(vNode: Kiru.VNode): void;
declare function vNodeContains(haystack: Kiru.VNode, needle: Kiru.VNode): boolean;
declare function traverseApply(vNode: Kiru.VNode, func: (node: Kiru.VNode) => void): void;
declare function findParent(vNode: Kiru.VNode, predicate: (n: Kiru.VNode) => boolean): Kiru.VNode | null;
declare function findParentErrorBoundary(vNode: Kiru.VNode): ErrorBoundaryNode | null;
declare function assertValidElementProps(vNode: Kiru.VNode): void;
declare function normalizeElementKey(thing: unknown): JSX.ElementKey | null;
declare function createVNodeId(vNode: Kiru.VNode): string;
declare function registerVNodeCleanup(vNode: Kiru.VNode, id: string, callback: () => void): void;
declare function propsChanged(oldProps: Kiru.VNode["props"], newProps: Kiru.VNode["props"], keysToSkip?: string[]): boolean;
declare function depthSort(a: Kiru.VNode, b: Kiru.VNode): number;
//# sourceMappingURL=vdom.d.ts.map