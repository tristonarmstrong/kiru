import { Signal } from "../signals/base.js";
import { __DEV__ } from "../env.js";
import { renderMode } from "../globals.js";
export { call, noop, latest, composeRefs, setRef, sideEffectsEnabled };
function call(fn) {
    fn();
}
const noop = Object.freeze(() => { });
/**
 * This is a no-op in production. It is used to get the latest
 * iteration of a component or signal after HMR has happened.
 */
function latest(thing) {
    let tgt = thing;
    if (__DEV__) {
        while ("__next" in tgt) {
            tgt = tgt.__next;
        }
    }
    return tgt;
}
/**
 * Composes multiple refs into a single ref callback.
 */
function composeRefs(...refs) {
    return (value) => {
        refs.forEach((ref) => setRef(ref, value));
    };
}
/**
 * Sets the value of a ref.
 */
function setRef(ref, value) {
    if (typeof ref === "function") {
        ref(value);
        return;
    }
    if (Signal.isSignal(ref)) {
        ref.value = value;
        return;
    }
    ref.current = value;
}
/**
 * Returns false if called during "stream" or "string" render modes.
 */
function sideEffectsEnabled() {
    return renderMode.current === "dom" || renderMode.current === "hydrate";
}
//# sourceMappingURL=runtime.js.map