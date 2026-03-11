export var DevTools;
(function (DevTools) {
    DevTools.track = (signal, label) => {
        if (!("window" in globalThis))
            return;
        window.__kiru.devtools?.track(signal, label);
    };
    DevTools.untrack = (signal) => {
        if (!("window" in globalThis))
            return;
        window.__kiru.devtools?.untrack(signal);
    };
    DevTools.subscribe = (callback) => {
        if (!("window" in globalThis) || !window.__kiru.devtools)
            return () => { };
        return window.__kiru.devtools.subscribe(callback);
    };
})(DevTools || (DevTools = {}));
//# sourceMappingURL=devtools.js.map