import { $HMR_ACCEPT } from "./constants.js";
import { Signal } from "./signals/base.js";
import type { Effect } from "./signals/effect.js";
export type HMRAccept<T = {}> = {
    provide: () => T;
    inject: (prev: T) => void;
    destroy: () => void;
};
export type GenericHMRAcceptor<T = {}> = {
    [$HMR_ACCEPT]: HMRAccept<T>;
};
type HotVar = Kiru.FC | Signal<any> | Kiru.Context<any>;
export declare function isHmrUpdate(): boolean;
export declare function isGenericHmrAcceptor(thing: unknown): thing is GenericHMRAcceptor<any>;
type HotVarRegistrationEntry = {
    type: string;
    value: HotVar;
    link: string;
};
export declare function createHmrContext(): {
    register: (hotVarRegistrationEntries: Record<string, HotVarRegistrationEntry>) => void;
    prepare: (filePath: string) => void;
    isReplacement: () => boolean;
    moduleEffects: {
        registerNext(): void;
        push(effect: Effect<any>): void;
    };
    onHmr: (callback: () => void) => void;
    getCurrentFilePath(): string | null;
};
/**
 * Queues a callback to be fired when HMR is triggered. This is a no-op in non-browser environments or in production.
 * - If called during current module evaluation, the callback will be fired the next time the current module is evaluated.
 * - If called at any other time, the callback will be fired the next time HMR is triggered.
 * @see https://kirujs.dev/docs/api/lifecycles#onHmr
 *
 * ```ts
 * import { onHmr } from "kiru"
 * // start an interval in the module scope
 * const interval = setInterval(() => {...}, 1000)
 * // stop the interval when this file is reloaded
 * onHmr(() => clearInterval(interval))
 ```
 */
export declare function onHmr(callback: () => void): void;
export {};
//# sourceMappingURL=hmr.d.ts.map