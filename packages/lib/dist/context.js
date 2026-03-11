import { $CONTEXT } from "./constants.js";
import { createElement } from "./element.js";
import { node } from "./globals.js";
export function createContext(defaultValue) {
    const Context = Object.assign(({ value, children }) => createElement($CONTEXT, { value, ctx: Context }, children), { [$CONTEXT]: () => defaultValue });
    Context.displayName = "Anonymous Context";
    return Context;
}
function getContextValue(vNode, context) {
    let n = vNode.parent;
    while (n) {
        if (n.type === $CONTEXT) {
            const provider = n;
            const { ctx, value } = provider.props;
            if (ctx === context) {
                return value;
            }
        }
        n = n.parent;
    }
    return context[$CONTEXT]();
}
export function useContext(context) {
    const n = node.current;
    if (!n) {
        throw new Error("useContext must be called inside a Kiru component");
    }
    return getContextValue(n, context);
}
//# sourceMappingURL=context.js.map