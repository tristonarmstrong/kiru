import { $ERROR_BOUNDARY } from "../constants.js";
import { createElement } from "../index.js";
/**
 * Catches errors in the children and renders a fallback component.
 * @see https://kirujs.dev/docs/components/error-boundary
 */
export function ErrorBoundary({ children, fallback, onError, }) {
    return createElement($ERROR_BOUNDARY, { children, fallback, onError });
}
//# sourceMappingURL=errorBoundary.js.map