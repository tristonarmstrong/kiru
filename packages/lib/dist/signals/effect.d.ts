import type { Signal } from "./base.js";
import type { SignalValues } from "./types.js";
type EffectCallbackReturn = (() => void) | void;
export declare class Effect<const Deps extends readonly Signal<unknown>[] = []> {
    protected id: string;
    protected callback: (...values: SignalValues<Deps>) => EffectCallbackReturn;
    protected deps?: Deps;
    protected unsubs: Map<string, Function>;
    protected cleanup: (() => void) | null;
    protected isRunning?: boolean;
    constructor(callback: (...values: SignalValues<Deps>) => EffectCallbackReturn, deps?: Deps);
    start(): void;
    stop(): void;
    private static run;
}
export declare function effect(callback: () => EffectCallbackReturn): Effect;
export declare function effect<const Deps extends readonly Signal<unknown>[]>(dependencies: Deps, callback: (...values: SignalValues<Deps>) => EffectCallbackReturn): Effect<Deps>;
export {};
//# sourceMappingURL=effect.d.ts.map