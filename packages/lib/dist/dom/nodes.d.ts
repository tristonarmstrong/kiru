import type { DomVNode, ElementVNode, SomeDom } from "../types.utils";
export { createDom, hydrateDom, getDomParent, placeDom };
type VNode = Kiru.VNode;
export type HostNode = {
    node: ElementVNode;
    lastChild?: SomeDom;
};
declare function createDom(vNode: DomVNode): SomeDom;
declare function hydrateDom(vNode: VNode): void;
declare function getDomParent(vNode: VNode): ElementVNode;
declare function placeDom(vNode: DomVNode, hostNode: HostNode): void;
//# sourceMappingURL=nodes.d.ts.map