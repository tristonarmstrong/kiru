const MAX_TICKS = 100;
const ProfilingEvents = [
    "updateNode",
    "createNode",
    "removeNode",
    "update",
    "updateDirtied",
    "signalTextUpdate",
    "signalAttrUpdate",
];
export function createProfilingContext() {
    const eventListeners = new Map();
    const appStats = new Map();
    return {
        appStats,
        emit: (event, app) => {
            eventListeners.get(event)?.forEach((listener) => listener(app));
        },
        addEventListener: (event, listener) => {
            if (!eventListeners.has(event)) {
                eventListeners.set(event, new Set());
            }
            eventListeners.get(event).add(listener);
        },
        removeEventListener: (event, listener) => {
            if (!eventListeners.has(event))
                return;
            eventListeners.get(event).delete(listener);
        },
        mountDuration: (app) => {
            const stats = appStats.get(app);
            if (!stats)
                return 0;
            return stats.mountDuration;
        },
        totalTicks: (app) => {
            const stats = appStats.get(app);
            if (!stats)
                return 0;
            return stats.totalTicks;
        },
        lastTickDuration: (app) => {
            const stats = appStats.get(app);
            if (!stats)
                return Infinity;
            let last = stats.timestamps[stats.timestamps.length - 1];
            if (!last)
                return Infinity;
            if (last.end === Infinity) {
                last = stats.timestamps[stats.timestamps.length - 2];
            }
            if (!last)
                return Infinity;
            return last.end - last.start;
        },
        averageTickDuration: (app) => {
            const stats = appStats.get(app);
            if (!stats)
                return 0;
            const completeTicks = stats.timestamps.filter((ts) => ts.end !== Infinity);
            return (completeTicks.reduce((a, b) => a + (b.end - b.start), 0) /
                completeTicks.length);
        },
        beginTick: (app) => {
            if (!appStats.has(app)) {
                appStats.set(app, {
                    mountDuration: Infinity,
                    timestamps: [],
                    totalTicks: 0,
                });
            }
            const stats = appStats.get(app);
            stats.totalTicks++;
            stats.timestamps.push({ start: performance.now(), end: Infinity });
        },
        endTick: (app) => {
            const stats = appStats.get(app);
            const last = stats.timestamps[stats.timestamps.length - 1];
            last.end = performance.now();
            if (stats.mountDuration === Infinity) {
                stats.mountDuration = last.end - last.start;
            }
            if (stats.timestamps.length > MAX_TICKS)
                stats.timestamps.shift();
        },
    };
}
//# sourceMappingURL=profiling.js.map