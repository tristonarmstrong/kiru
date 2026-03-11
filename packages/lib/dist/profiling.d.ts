import type { AppHandle } from "./appHandle";
declare const ProfilingEvents: readonly ["updateNode", "createNode", "removeNode", "update", "updateDirtied", "signalTextUpdate", "signalAttrUpdate"];
export type ProfilingEvent = (typeof ProfilingEvents)[number];
export interface AppStats {
    timestamps: TickTS[];
    mountDuration: number;
    totalTicks: number;
}
interface TickTS {
    start: number;
    end: number;
}
type ProfilingEventListener = (app: AppHandle) => void;
export declare function createProfilingContext(): {
    appStats: Map<AppHandle, AppStats>;
    emit: (event: ProfilingEvent, app: AppHandle) => void;
    addEventListener: (event: ProfilingEvent, listener: ProfilingEventListener) => void;
    removeEventListener: (event: ProfilingEvent, listener: ProfilingEventListener) => void;
    mountDuration: (app: AppHandle) => number;
    totalTicks: (app: AppHandle) => number;
    lastTickDuration: (app: AppHandle) => number;
    averageTickDuration: (app: AppHandle) => number;
    beginTick: (app: AppHandle) => void;
    endTick: (app: AppHandle) => void;
};
export {};
//# sourceMappingURL=profiling.d.ts.map