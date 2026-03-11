var _a;
import { $KIRU_ERROR } from "./constants.js";
import { __DEV__ } from "./env.js";
import { findParent, noop } from "./utils/index.js";
export class KiruError extends Error {
    constructor(optionsOrMessage) {
        const message = typeof optionsOrMessage === "string"
            ? optionsOrMessage
            : optionsOrMessage.message;
        super(message);
        this[_a] = true;
        if (typeof optionsOrMessage !== "string") {
            if (__DEV__ && optionsOrMessage?.vNode) {
                this.customNodeStack = captureErrorStack(optionsOrMessage.vNode);
            }
            this.fatal = optionsOrMessage?.fatal;
        }
    }
    static isKiruError(error) {
        return error instanceof Error && error[$KIRU_ERROR] === true;
    }
}
_a = $KIRU_ERROR;
function captureErrorStack(vNode) {
    let n = vNode;
    let componentFns = [];
    while (n) {
        if (!n.parent)
            break; // skip root node
        if (typeof n.type === "function") {
            componentFns.push(getComponentErrorDisplayText(n.type));
        }
        else if (typeof n.type === "string") {
            componentFns.push(n.type);
        }
        n = n.parent;
    }
    const componentNode = (typeof vNode.type === "function"
        ? vNode
        : findParent(vNode, (n) => typeof n.type === "function"));
    return `The above error occurred in the <${getFunctionName(componentNode?.type || noop)}> component:

${componentFns.map((x) => `   at ${x}`).join("\n")}\n`;
}
function getComponentErrorDisplayText(fn) {
    let str = getFunctionName(fn);
    if (__DEV__) {
        const fileLink = getComponentFileLink(fn);
        if (fileLink) {
            str = `${str} (${fileLink})`;
        }
    }
    return str;
}
function getFunctionName(fn) {
    return fn.displayName ?? (fn.name || "Anonymous Function");
}
function getComponentFileLink(fn) {
    return fn.toString().match(/\/\/ \[kiru_devtools\]:(.*)/)?.[1] ?? null;
}
//# sourceMappingURL=error.js.map