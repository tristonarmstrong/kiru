import { call } from "../utils/index.js";
import { Signal } from "./base.js";
import { effectQueue } from "./globals.js";
import { tracking } from "./tracking.js";
export function unwrap(value, reactive = false) {
    if (!Signal.isSignal(value))
        return value;
    return reactive ? value.value : value.peek();
}
export function tick() {
    effectQueue.forEach(call);
    effectQueue.clear();
}
export function untrack(fn) {
    tracking.enabled = false;
    const result = fn();
    tracking.enabled = true;
    return result;
}
//# sourceMappingURL=utils.js.map