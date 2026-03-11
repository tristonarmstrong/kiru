import { Signal } from "./base.js";
export declare function unwrap<T>(value: T | Signal<T>, reactive?: boolean): T;
export declare function tick(): void;
export declare function untrack<T>(fn: () => T): T;
//# sourceMappingURL=utils.d.ts.map