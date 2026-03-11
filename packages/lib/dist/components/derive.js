import { sideEffectsEnabled } from "../utils/index.js";
import { Signal } from "../signals/index.js";
import { $STREAM_DATA } from "../constants.js";
import { node } from "../globals.js";
import { ref } from "../ref.js";
import { requestUpdate } from "../scheduler.js";
import { isStatefulPromise } from "../statefulPromise.js";
/**
 * Derives a value from a signal or stateful promise and renders a child component.
 * @see https://kirujs.dev/docs/components/derive
 */
export const Derive = () => {
    return (props) => {
        const { from, children, fallback, mode } = props;
        const prevSuccess = ref(null);
        const promises = new Set();
        let value;
        if (isStatefulPromise(from)) {
            promises.add(from);
            value = from.value;
        }
        else if (Signal.isSignal(from)) {
            value = from.value;
        }
        else {
            const out = {};
            for (const key in from) {
                const v = from[key];
                if (isStatefulPromise(v))
                    promises.add(v);
                out[key] = v.value;
            }
            value = out;
        }
        if (promises.size === 0) {
            return children(value);
        }
        if (!sideEffectsEnabled()) {
            throw {
                [$STREAM_DATA]: {
                    fallback,
                    data: Array.from(promises),
                },
            };
        }
        for (const p of promises) {
            if (p.state === "rejected") {
                throw p.error;
            }
            if (p.state === "pending") {
                const nodeRef = node.current;
                Promise.allSettled(promises).then(() => requestUpdate(nodeRef));
                const prev = prevSuccess.current;
                if (mode !== "fallback" && prev) {
                    return children(prev, true);
                }
                return fallback;
            }
        }
        prevSuccess.current = value;
        return children(value, false);
    };
};
//# sourceMappingURL=derive.js.map