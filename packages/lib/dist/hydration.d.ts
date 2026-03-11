import type { MaybeDom, SomeDom } from "./types.utils";
export declare const hydrationStack: {
    bumpChildIndex(): void;
    getCurrentChild(): MaybeDom;
    getCurrentParent(): SomeDom;
    clear(): void;
    pop(): void;
    push(el: SomeDom): void;
};
//# sourceMappingURL=hydration.d.ts.map