import { unwrap } from "../signals/index.js";
/**
 * Conditionally renders a child component based on the 'when' prop.
 * If the 'when' prop is truthy, the child component is rendered.
 * If the 'when' prop is falsy, the fallback component is rendered.
 * If the 'when' prop is a Signal, it creates an automatically-updating component with fine-grained reactivity.
 * @see https://kirujs.dev/docs/components/show
 */
export function Show({ children, when, fallback, }) {
    const value = unwrap(when, true);
    if (!!value) {
        return typeof children === "function"
            ? children(value)
            : children;
    }
    return fallback;
}
//# sourceMappingURL=show.js.map