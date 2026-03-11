import { __DEV__ } from "./env.js";
import { createHmrContext } from "./hmr.js";
import { createProfilingContext } from "./profiling.js";
import { fileRouterInstance } from "./router/globals.js";
export { createKiruGlobalContext };
function createKiruGlobalContext() {
    const apps = new Set();
    const listeners = new Map();
    function emit(event, app, data) {
        listeners.get(event)?.forEach((cb) => cb(app, data));
    }
    function on(event, callback) {
        if (!listeners.has(event)) {
            listeners.set(event, new Set());
        }
        listeners.get(event).add(callback);
    }
    function off(event, callback) {
        listeners.get(event)?.delete(callback);
    }
    const globalContext = {
        get apps() {
            return Array.from(apps);
        },
        emit,
        on,
        off,
    };
    // Initialize event listeners
    on("mount", (app) => apps.add(app));
    on("unmount", (app) => apps.delete(app));
    if (__DEV__) {
        globalContext.HMRContext = createHmrContext();
        globalContext.profilingContext = createProfilingContext();
        globalContext.fileRouterInstance = fileRouterInstance;
        const debuggerEntries = new Set();
        const subscribers = new Set();
        globalContext.devtools = {
            track: (signal, label) => {
                debuggerEntries.add({
                    label: label ?? signal.displayName ?? "Unnamed Signal",
                    signal,
                });
                subscribers.forEach((cb) => cb(debuggerEntries));
            },
            untrack: (signal) => {
                debuggerEntries.forEach((entry) => {
                    if (entry.signal === signal) {
                        debuggerEntries.delete(entry);
                    }
                });
                subscribers.forEach((cb) => cb(debuggerEntries));
            },
            subscribe: (cb) => {
                subscribers.add(cb);
                cb(debuggerEntries);
                return () => subscribers.delete(cb);
            },
        };
    }
    return globalContext;
}
//# sourceMappingURL=globalContext.js.map