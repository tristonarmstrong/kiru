import { onCleanup } from "../hooks/onCleanup.js";
import { signal } from "../signals/base.js";
import { effect } from "../signals/effect.js";
import { unwrap } from "../signals/utils.js";
/**
 * Animates the DOM in a procedural/coroutine-like fashion. Useful for modals, drawers, dialogs and more.
 * @see https://kirujs.dev/docs/components/transition
 */
export const Transition = (props) => {
    const tState = signal(props.initialState || "exited");
    let timeoutRef;
    const setTransitionState = (transitionState) => {
        clearTimeout(timeoutRef);
        tState.value = transitionState;
        if (transitionState === "entered" || transitionState === "exited") {
            if (props.onTransitionEnd)
                props.onTransitionEnd(transitionState);
        }
    };
    const queueStateChange = (transitionState) => {
        timeoutRef = window.setTimeout(() => setTransitionState(transitionState), getTiming(transitionState, props.duration));
    };
    effect(() => {
        const newIn = unwrap(props.in, true);
        const current = tState.peek();
        if (newIn && current !== "entered" && current !== "entering") {
            setTransitionState("entering");
            queueStateChange("entered");
        }
        else if (!newIn && current !== "exited" && current !== "exiting") {
            setTransitionState("exiting");
            queueStateChange("exited");
        }
    });
    onCleanup(() => clearTimeout(timeoutRef));
    return (newProps) => {
        return newProps.element(tState.value);
    };
};
const defaultDuration = 150;
function getTiming(transitionState, duration) {
    if (typeof duration === "number")
        return duration;
    switch (transitionState) {
        case "entered":
            return duration?.in ?? defaultDuration;
        case "exited":
            return duration?.out ?? defaultDuration;
    }
}
//# sourceMappingURL=transition.js.map