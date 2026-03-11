var _a;
import { latest, safeStringify, sideEffectsEnabled, generateRandomID, registerVNodeCleanup, } from "../utils/index.js";
import { $DEV_FILE_LINK, $HMR_ACCEPT, $SIGNAL } from "../constants.js";
import { __DEV__, isBrowser } from "../env.js";
import { node } from "../globals.js";
import { requestUpdate } from "../scheduler.js";
import { tracking } from "./tracking.js";
export class Signal {
    constructor(initial, displayName) {
        this[_a] = true;
        this.$id = generateRandomID();
        this.$value = initial;
        this.$subs = new Set();
        if (displayName)
            this.displayName = displayName;
        if (__DEV__) {
            this.$initialValue = safeStringify(initial);
            this[$HMR_ACCEPT] = {
                provide: () => {
                    return this;
                },
                inject: (prev) => {
                    if (isBrowser)
                        window.__kiru.devtools?.untrack(prev);
                    this.$id = prev.$id;
                    this.$subs = prev.$subs;
                    if (this.$initialValue === prev.$initialValue) {
                        this.$value = prev.$value;
                    }
                    else {
                        this.notify();
                    }
                },
                destroy: () => { },
            };
        }
        const n = node.current;
        if (n) {
            registerVNodeCleanup(n, this.$id, Signal.dispose.bind(null, this));
        }
    }
    get value() {
        if (__DEV__) {
            const tgt = latest(this);
            Signal.entangle(tgt);
            return tgt.$value;
        }
        Signal.entangle(this);
        return this.$value;
    }
    set value(next) {
        if (__DEV__) {
            const tgt = latest(this);
            if (Object.is(tgt.$value, next))
                return;
            tgt.$prevValue = tgt.$value;
            tgt.$value = next;
            tgt.notify();
            return;
        }
        if (Object.is(this.$value, next))
            return;
        this.$prevValue = this.$value;
        this.$value = next;
        this.notify();
    }
    peek() {
        if (__DEV__) {
            return latest(this).$value;
        }
        return this.$value;
    }
    sneak(newValue) {
        if (__DEV__) {
            const tgt = latest(this);
            tgt.$prevValue = tgt.$value;
            tgt.$value = newValue;
            return;
        }
        this.$prevValue = this.$value;
        this.$value = newValue;
    }
    toString() {
        if (__DEV__) {
            const tgt = latest(this);
            Signal.entangle(tgt);
            return `${tgt.$value}`;
        }
        Signal.entangle(this);
        return `${this.$value}`;
    }
    subscribe(cb) {
        if (__DEV__) {
            const tgt = latest(this);
            if (__DEV__ && tgt.$isDisposed) {
                const name = tgt.displayName ?? tgt.$id;
                let message = `Attempted to subscribe to a signal that has been disposed: ${name}`;
                if ($DEV_FILE_LINK in tgt) {
                    message += `\nFile: ${tgt[$DEV_FILE_LINK]}`;
                }
                message += `\nInitial value: ${tgt.$initialValue}`;
                throw new Error(message);
            }
        }
        this.$subs.add(cb);
        return () => this.$subs.delete(cb);
    }
    notify(filter) {
        if (__DEV__) {
            const tgt = latest(this);
            return tgt.$subs.forEach((sub) => {
                if (filter && !filter(sub))
                    return;
                const { $value, $prevValue } = latest(this);
                return sub($value, $prevValue);
            });
        }
        this.$subs.forEach((sub) => {
            if (filter && !filter(sub))
                return;
            return sub(this.$value, this.$prevValue);
        });
    }
    static isSignal(x) {
        return typeof x === "object" && !!x && $SIGNAL in x;
    }
    static subscribers(signal) {
        return signal.$subs;
    }
    static entangle(signal) {
        if (tracking.enabled === false)
            return;
        if (__DEV__)
            signal = latest(signal);
        const vNode = node.current;
        const trackedSignalObservations = tracking.current();
        if (trackedSignalObservations) {
            // track non-rendering access, only track rendering access if renderMode is DOM/hydrate
            if (!vNode || (vNode && sideEffectsEnabled())) {
                trackedSignalObservations.set(signal.$id, signal);
            }
            return;
        }
        if (!vNode || !sideEffectsEnabled())
            return;
        const unsub = signal.subscribe(() => requestUpdate(vNode));
        (vNode.subs ?? (vNode.subs = new Set())).add(unsub);
    }
    static dispose(signal) {
        signal.$isDisposed = true;
        if (__DEV__) {
            if (isBrowser)
                window.__kiru.devtools?.untrack(latest(signal));
            return;
        }
        signal.$subs.clear();
    }
}
_a = $SIGNAL;
export const signal = (initial, displayName) => {
    return new Signal(initial, displayName);
};
//# sourceMappingURL=base.js.map