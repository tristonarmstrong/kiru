import type { Signal } from "./base.js";
import type { SignalValues } from "./types.js";
export type TrackingStackObservations = Map<string, Signal<unknown>>;
export declare const tracking: {
    enabled: boolean;
    stack: TrackingStackObservations[];
    current: () => TrackingStackObservations | undefined;
};
type TrackedExecutionContext<T, Deps extends readonly Signal<unknown>[]> = {
    id: string;
    subs: Map<string, Function>;
    fn: (...values: SignalValues<Deps>) => T;
    deps?: Deps;
    onDepChanged: () => void;
};
/**
 * Executes an effect function with dependency tracking enabled, and manages
 * the effect's subscriptions.
 * @param ctx - The execution context
 * @returns The result of the effect function
 */
export declare function executeWithTracking<T, Deps extends readonly Signal<unknown>[]>(ctx: TrackedExecutionContext<T, Deps>): T;
export {};
//# sourceMappingURL=tracking.d.ts.map