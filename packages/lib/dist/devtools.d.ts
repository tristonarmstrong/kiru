import type { DebuggerEntry } from "./globalContext";
export declare namespace DevTools {
    const track: (signal: Kiru.Signal<unknown>, label?: string) => void;
    const untrack: (signal: Kiru.Signal<unknown>) => void;
    const subscribe: (callback: (entries: Set<DebuggerEntry>) => void) => () => void;
}
//# sourceMappingURL=devtools.d.ts.map