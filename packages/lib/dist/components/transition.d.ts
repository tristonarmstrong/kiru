import { Signal } from "../signals/base.js";
export type TransitionState = "entering" | "entered" | "exiting" | "exited";
interface TransitionProps {
    in: boolean | Signal<boolean>;
    /**
     * Initial state of the transition
     * @default "exited"
     */
    initialState?: "entered" | "exited";
    duration?: number | {
        in: number;
        out: number;
    };
    element: (state: "entering" | "entered" | "exiting" | "exited") => JSX.Element;
    onTransitionEnd?: (state: "entered" | "exited") => void;
}
/**
 * Animates the DOM in a procedural/coroutine-like fashion. Useful for modals, drawers, dialogs and more.
 * @see https://kirujs.dev/docs/components/transition
 */
export declare const Transition: Kiru.FC<TransitionProps>;
export {};
//# sourceMappingURL=transition.d.ts.map