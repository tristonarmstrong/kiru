import { node } from "../globals.js";
import { sideEffectsEnabled } from "../utils/index.js";
import { effectQueue } from "./globals.js";
import { tick } from "./utils.js";
export const tracking = {
    enabled: true,
    stack: new Array(),
    current: function () {
        return this.stack[this.stack.length - 1];
    },
};
/**
 * Executes an effect function with dependency tracking enabled, and manages
 * the effect's subscriptions.
 * @param ctx - The execution context
 * @returns The result of the effect function
 */
export function executeWithTracking(ctx) {
    const { id, subs, fn, deps = [], onDepChanged } = ctx;
    let observations;
    effectQueue.delete(id);
    const isServer = !!node.current && !sideEffectsEnabled();
    if (!isServer) {
        observations = new Map();
        tracking.stack.push(observations);
    }
    const result = fn(...deps.map((s) => s.value));
    if (!isServer) {
        for (const [id, unsub] of subs) {
            if (observations.has(id))
                continue;
            unsub();
            subs.delete(id);
        }
        const effect = () => {
            if (!effectQueue.size) {
                queueMicrotask(tick);
            }
            effectQueue.set(id, onDepChanged);
        };
        for (const [id, sig] of observations) {
            if (subs.has(id))
                continue;
            const unsub = sig.subscribe(effect);
            subs.set(id, unsub);
        }
        tracking.stack.pop();
    }
    return result;
}
//# sourceMappingURL=tracking.js.map