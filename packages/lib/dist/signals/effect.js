import { __DEV__, isBrowser } from "../env.js";
import { effectQueue } from "./globals.js";
import { executeWithTracking } from "./tracking.js";
import { latest, generateRandomID, call, registerVNodeCleanup, sideEffectsEnabled, } from "../utils/index.js";
import { node } from "../globals.js";
export class Effect {
    constructor(callback, deps) {
        this.id = generateRandomID();
        this.callback = callback;
        this.deps = deps;
        this.unsubs = new Map();
        this.isRunning = false;
        this.cleanup = null;
        if (__DEV__ && isBrowser) {
            window.__kiru.HMRContext.moduleEffects.push(this);
        }
        const n = node.current;
        if (n) {
            if (!sideEffectsEnabled())
                return; // prevent side effects in non-browser environments
            registerVNodeCleanup(n, this.id, this.stop.bind(this));
        }
        this.start();
    }
    start() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        // postpone execution during HMR
        if (__DEV__ && isBrowser && window.__kiru.HMRContext?.isReplacement()) {
            return queueMicrotask(() => {
                if (this.isRunning) {
                    Effect.run(this);
                }
            });
        }
        Effect.run(this);
    }
    stop() {
        effectQueue.delete(this.id);
        this.unsubs.forEach(call);
        this.unsubs.clear();
        this.cleanup?.();
        this.cleanup = null;
        this.isRunning = false;
    }
    static run(watchEffect) {
        const effect = latest(watchEffect);
        const { id, callback: getter, unsubs: subs, deps } = effect;
        effect.cleanup =
            executeWithTracking({
                id,
                subs,
                fn: getter,
                deps,
                onDepChanged: () => {
                    effect.cleanup?.();
                    Effect.run(effect);
                },
            }) ?? null;
    }
}
export function effect(depsOrGetter, callback) {
    if (typeof depsOrGetter === "function") {
        return new Effect(depsOrGetter);
    }
    const dependencies = depsOrGetter;
    const effectGetter = callback;
    return new Effect(effectGetter, dependencies);
}
//# sourceMappingURL=effect.js.map