import { createHmrContext } from "./hmr.js";
import { createProfilingContext } from "./profiling.js";
import type { FileRouterController } from "./router/fileRouterController";
import type { AppHandle } from "./appHandle";
export { createKiruGlobalContext, type GlobalKiruEvent, type KiruGlobalContext };
type Evt = {
    name: "mount";
    data?: undefined;
} | {
    name: "unmount";
    data?: undefined;
} | {
    name: "update";
    data?: undefined;
} | {
    name: "error";
    data: Error;
};
type GlobalKiruEvent = Evt["name"];
export type DebuggerEntry = {
    label: string;
    signal: Kiru.Signal<unknown>;
};
interface KiruGlobalContext {
    readonly apps: AppHandle[];
    emit<T extends Evt>(event: T["name"], app: AppHandle, data?: T["data"]): void;
    on<T extends Evt>(event: T["name"], callback: (app: AppHandle, data: T["data"]) => void): void;
    off<T extends Evt>(event: T["name"], callback: (app: AppHandle, data?: T["data"]) => void): void;
    devtools?: {
        track: (signal: Kiru.Signal<unknown>, label?: string) => void;
        untrack: (signal: Kiru.Signal<unknown>) => void;
        subscribe: (callback: (entries: Set<DebuggerEntry>) => void) => () => void;
    };
    HMRContext?: ReturnType<typeof createHmrContext>;
    profilingContext?: ReturnType<typeof createProfilingContext>;
    fileRouterInstance?: {
        current: FileRouterController | null;
    };
}
declare function createKiruGlobalContext(): KiruGlobalContext;
//# sourceMappingURL=globalContext.d.ts.map