import { $HMR_ACCEPT, $SIGNAL } from "../constants.js";
import type { SignalSubscriber } from "./types.js";
import type { HMRAccept } from "../hmr.js";
export declare class Signal<T> {
    [$SIGNAL]: boolean;
    [$HMR_ACCEPT]?: HMRAccept<Signal<any>>;
    displayName?: string;
    protected $subs: Set<SignalSubscriber<any>>;
    protected $id: string;
    protected $value: T;
    protected $prevValue?: T;
    protected $initialValue?: string;
    protected __next?: Signal<T>;
    protected $isDisposed?: boolean;
    constructor(initial: T, displayName?: string);
    get value(): T;
    set value(next: T);
    peek(): T;
    sneak(newValue: T): void;
    toString(): string;
    subscribe(cb: (state: T, prevState?: T) => void): () => void;
    notify(filter?: (sub: SignalSubscriber) => boolean): void;
    static isSignal(x: any): x is Signal<any>;
    static subscribers(signal: Signal<any>): Set<SignalSubscriber<any>>;
    static entangle<T>(signal: Signal<T>): void;
    static dispose(signal: Signal<any>): void;
}
export declare const signal: <T>(initial: T, displayName?: string) => Signal<T>;
//# sourceMappingURL=base.d.ts.map