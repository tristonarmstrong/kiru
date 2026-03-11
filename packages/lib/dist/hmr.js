import { $HMR_ACCEPT, $DEV_FILE_LINK } from "./constants.js";
import { traverseApply } from "./utils/index.js";
import { flushSync, requestUpdate } from "./scheduler.js";
let _isHmrUpdate = false;
export function isHmrUpdate() {
    return _isHmrUpdate;
}
export function isGenericHmrAcceptor(thing) {
    return (!!thing &&
        (typeof thing === "object" || typeof thing === "function") &&
        $HMR_ACCEPT in thing &&
        typeof thing[$HMR_ACCEPT] === "object" &&
        !!thing[$HMR_ACCEPT]);
}
export function createHmrContext() {
    const moduleMap = new Map();
    let currentModuleFilePath = null;
    let currentModuleMemory = null;
    let isModuleReplacementExecution = false;
    const isReplacement = () => isModuleReplacementExecution;
    let isWaitingForNextEffect = false;
    const globalHmrCallbacks = [];
    const onHmr = (callback) => {
        if (currentModuleMemory) {
            currentModuleMemory.hmrCallbacks.push(callback);
            return;
        }
        globalHmrCallbacks.push(callback);
    };
    const prepare = (filePath) => {
        let mod = moduleMap.get(filePath);
        isModuleReplacementExecution = !!mod;
        if (!mod) {
            mod = {
                hotVars: new Map(),
                unnamedEffects: [],
                hmrCallbacks: [],
            };
            moduleMap.set(filePath, mod);
        }
        else {
            while (mod.hmrCallbacks.length)
                mod.hmrCallbacks.shift()();
            while (globalHmrCallbacks.length)
                globalHmrCallbacks.shift()();
            for (const effect of mod.unnamedEffects) {
                effect.stop();
            }
            mod.unnamedEffects.length = 0;
        }
        currentModuleMemory = mod;
        currentModuleFilePath = filePath;
    };
    const register = (hotVarRegistrationEntries) => {
        if (currentModuleMemory === null)
            throw new Error("[kiru]: HMR could not register: No active module");
        let dirtyNodes = new Set();
        for (const [name, newEntry] of Object.entries(hotVarRegistrationEntries)) {
            const oldEntry = currentModuleMemory.hotVars.get(name);
            // @ts-ignore - this is how we tell devtools what file the hotvar is from
            newEntry.value[$DEV_FILE_LINK] = newEntry.link;
            if (oldEntry?.value) {
                /**
                 * this is how, when the previous value has been stored somewhere else (eg. in a Map, or by Vike),
                 * we can trace it to its current version by using latest(value)
                 */
                // @ts-ignore
                oldEntry.value.__next = newEntry.value;
            }
            currentModuleMemory.hotVars.set(name, newEntry);
            if (!oldEntry)
                continue;
            if (isGenericHmrAcceptor(oldEntry.value) &&
                isGenericHmrAcceptor(newEntry.value)) {
                newEntry.value[$HMR_ACCEPT].inject(oldEntry.value[$HMR_ACCEPT].provide());
                oldEntry.value[$HMR_ACCEPT].destroy();
                continue;
            }
            if (oldEntry.type === "component" && newEntry.type === "component") {
                window.__kiru.apps.forEach((app) => {
                    traverseApply(app.rootNode, (vNode) => {
                        if (vNode.type === oldEntry.value) {
                            vNode.type = newEntry.value;
                            dirtyNodes.add(vNode);
                        }
                    });
                });
            }
        }
        if (dirtyNodes.size) {
            _isHmrUpdate = true;
            dirtyNodes.forEach((n) => requestUpdate(n));
            flushSync();
            _isHmrUpdate = false;
        }
        isModuleReplacementExecution = false;
        currentModuleMemory = null;
        currentModuleFilePath = null;
    };
    const moduleEffects = {
        registerNext() {
            isWaitingForNextEffect = true;
        },
        push(effect) {
            if (!isWaitingForNextEffect)
                return;
            currentModuleMemory.unnamedEffects.push(effect);
            isWaitingForNextEffect = false;
        },
    };
    return {
        register,
        prepare,
        isReplacement,
        moduleEffects,
        onHmr,
        getCurrentFilePath() {
            return currentModuleFilePath;
        },
    };
}
/**
 * Queues a callback to be fired when HMR is triggered. This is a no-op in non-browser environments or in production.
 * - If called during current module evaluation, the callback will be fired the next time the current module is evaluated.
 * - If called at any other time, the callback will be fired the next time HMR is triggered.
 * @see https://kirujs.dev/docs/api/lifecycles#onHmr
 *
 * ```ts
 * import { onHmr } from "kiru"
 * // start an interval in the module scope
 * const interval = setInterval(() => {...}, 1000)
 * // stop the interval when this file is reloaded
 * onHmr(() => clearInterval(interval))
 ```
 */
export function onHmr(callback) {
    if ("window" in globalThis && window.__kiru.HMRContext) {
        window.__kiru.HMRContext.onHmr(callback);
    }
}
//# sourceMappingURL=hmr.js.map