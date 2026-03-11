import { Signal } from "../signals/base.js";
import type { DomVNode, SomeDom } from "../types.utils.js";
export { updateDomProps, unmountDomProps, setSignalProp };
type VNode = Kiru.VNode;
declare function updateDomProps(vNode: DomVNode): void;
declare function unmountDomProps(vNode: DomVNode, dom: SomeDom, prevProps: Record<string, any>, cleanups?: DomVNode["cleanups"]): void;
declare function setSignalProp(vNode: VNode, dom: Exclude<SomeDom, Text>, key: string, signal: Signal<any>, prevValue: unknown): void;
//# sourceMappingURL=props.d.ts.map