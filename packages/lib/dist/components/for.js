import { unwrap } from "../signals/index.js";
/**
 * Renders a list of items. If the list a Signal, it creates an automatically-updating list with fine-grained reactivity.
 * If the list is empty, the fallback is rendered.
 * @see https://kirujs.dev/docs/components/for
 */
export function For({ each, fallback, children, }) {
    const items = unwrap(each, true);
    if (items.length === 0)
        return fallback;
    return items.map(children);
}
//# sourceMappingURL=for.js.map