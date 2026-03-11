import { __DEV__ } from "../env.js";
import { $HMR_ACCEPT } from "../constants.js";
import { call, latest } from "../utils/index.js";
import { effectQueue } from "./globals.js";
import { executeWithTracking } from "./tracking.js";
import { Signal } from "./base.js";
export class ComputedSignal extends Signal {
    constructor(getter, displayName) {
        super(void 0, displayName);
        this.$getter = getter;
        this.$unsubs = new Map();
        this.$isDirty = true;
        if (__DEV__) {
            const { inject: baseInject } = this[$HMR_ACCEPT];
            // @ts-expect-error this is fine 😅
            this[$HMR_ACCEPT] = {
                provide: () => {
                    return this;
                },
                inject: (prev) => {
                    baseInject(prev);
                    // Stop any pending reactions on the previous instance and mark
                    // this computed as dirty so it will recompute with the latest
                    // dependencies after HMR.
                    ComputedSignal.stop(prev);
                    this.$isDirty = true;
                    // Force a recompute immediately so any active subscribers (like
                    // text nodes bound to a computed signal) see the updated value
                    // after a hot reload where only its dependencies changed.
                    ComputedSignal.run(this);
                    this.notify();
                },
                destroy: () => { },
            };
        }
    }
    get value() {
        this.ensureNotDirty();
        return super.value;
    }
    set value(next) {
        super.value = next;
    }
    toString() {
        this.ensureNotDirty();
        return super.toString();
    }
    peek() {
        this.ensureNotDirty();
        return super.peek();
    }
    subscribe(cb) {
        if (this.$isDirty) {
            ComputedSignal.run(this);
        }
        return super.subscribe(cb);
    }
    static dispose(signal) {
        ComputedSignal.stop(signal);
        Signal.dispose(signal);
    }
    static stop(computed) {
        if (__DEV__) {
            computed = latest(computed);
        }
        const { $id, $unsubs } = computed;
        effectQueue.delete($id);
        $unsubs.forEach(call);
        $unsubs.clear();
        computed.$isDirty = true;
    }
    static run(computed) {
        if (__DEV__) {
            computed = latest(computed);
        }
        const { $id: id, $getter, $unsubs: subs } = computed;
        const value = executeWithTracking({
            id,
            subs,
            fn: () => $getter(computed.$value),
            onDepChanged: () => {
                computed.$isDirty = true;
                if (!computed.$subs.size)
                    return;
                ComputedSignal.run(computed);
                if (Object.is(computed.$value, computed.$prevValue))
                    return;
                computed.notify();
            },
        });
        computed.sneak(value);
        computed.$isDirty = false;
    }
    ensureNotDirty() {
        let computed = this;
        if (__DEV__) {
            computed = latest(this);
        }
        if (!computed.$isDirty) {
            const pending = effectQueue.get(computed.$id);
            if (pending) {
                pending();
                effectQueue.delete(computed.$id);
            }
        }
        if (!computed.$isDirty)
            return;
        if (__DEV__) {
            /**
             * This is a safeguard for dev-mode only, where a 'read' on an
             * already-disposed signal during HMR update => `dom.setSignalProp`
             * would throw due to invalid subs-map access.
             *
             * Perhaps in future we could handle this better by carrying over
             * the previous signal's ID and not disposing it / deleting the
             * map entry.
             */
            if (computed.$isDisposed)
                return;
        }
        ComputedSignal.run(computed);
    }
}
export function computed(getter, displayName) {
    return new ComputedSignal(getter, displayName);
}
//# sourceMappingURL=computed.js.map