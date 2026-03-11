import { Signal } from "./base.js";
export declare class ComputedSignal<T> extends Signal<T> {
    protected $getter: (prev?: T) => T;
    protected $unsubs: Map<string, Function>;
    protected $isDirty: boolean;
    constructor(getter: (prev?: T) => T, displayName?: string);
    get value(): T;
    set value(next: T);
    toString(): string;
    peek(): T;
    subscribe(cb: (state: T, prevState?: T) => void): () => void;
    static dispose(signal: ComputedSignal<any>): void;
    private static stop;
    private static run;
    private ensureNotDirty;
}
export declare function computed<T>(getter: (prev?: T) => T, displayName?: string): ComputedSignal<T>;
//# sourceMappingURL=computed.d.ts.map