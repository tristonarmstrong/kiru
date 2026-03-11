import { $STREAM_DATA, STREAMED_DATA_EVENT } from "./constants.js";
import { hydrationMode, node, renderMode } from "./globals.js";
import { signal } from "./signals/base.js";
import { createVNodeId } from "./utils/vdom.js";
import { onCleanup } from "./hooks/onCleanup.js";
/**
 * Returns true if the value is a {@link StreamDataThrowValue}
 */
export function isStreamDataThrowValue(value) {
    return typeof value === "object" && !!value && $STREAM_DATA in value;
}
/**
 * Returns true if the value is a {@link Kiru.StatefulPromiseBase}
 */
export function isStatefulPromise(thing) {
    return thing instanceof Promise && "id" in thing && "state" in thing;
}
const nodeToPromiseIndex = new WeakMap();
export function statefulPromise(callback) {
    const vNode = node.current;
    if (!vNode) {
        throw new Error("statefulPromise must be called inside a Kiru component");
    }
    const id = createVNodeId(vNode);
    const isPending = signal(true);
    isPending.value = true;
    const controller = new AbortController();
    onCleanup(() => controller.abort());
    const index = nodeToPromiseIndex.get(vNode) ?? 0;
    nodeToPromiseIndex.set(vNode, index + 1);
    const promiseId = `${id}:data:${index}`;
    let promise;
    if (renderMode.current === "string") {
        // if we're rendering to a string, there's no need to fire the callback
        promise = Promise.resolve();
    }
    else if (renderMode.current === "hydrate" &&
        hydrationMode.current === "dynamic") {
        // if we're hydrating and the hydration mode is not static,
        // we need to resolve the promise from cache/event
        promise = resolveDeferredPromise(promiseId, controller.signal);
    }
    else {
        // dom / stream / (hydrate + static)
        promise = callback(controller.signal);
    }
    const state = {
        id: promiseId,
        state: "pending",
    };
    const statefulPromise = Object.assign(promise, state);
    statefulPromise
        .then((value) => {
        statefulPromise.state = "fulfilled";
        statefulPromise.value = value;
        isPending.value = false;
    })
        .catch((error) => {
        statefulPromise.state = "rejected";
        statefulPromise.error = error instanceof Error ? error : new Error(error);
    });
    return Object.assign(statefulPromise, { isPending });
}
function resolveDeferredPromise(id, signal) {
    return new Promise((resolve, reject) => {
        const deferralCache = // @ts-ignore
         (window[STREAMED_DATA_EVENT] ?? (window[STREAMED_DATA_EVENT] = new Map()));
        const existing = deferralCache.get(id);
        if (existing) {
            const { data, error } = existing;
            deferralCache.delete(id);
            if (error)
                return reject(error);
            return resolve(data);
        }
        const onDataEvent = (event) => {
            const { detail } = event;
            if (detail.id === id) {
                deferralCache.delete(id);
                window.removeEventListener(STREAMED_DATA_EVENT, onDataEvent);
                const { data, error } = detail;
                if (error)
                    return reject(error);
                resolve(data);
            }
        };
        window.addEventListener(STREAMED_DATA_EVENT, onDataEvent);
        signal.addEventListener("abort", () => {
            window.removeEventListener(STREAMED_DATA_EVENT, onDataEvent);
            reject();
        });
    });
}
//# sourceMappingURL=statefulPromise.js.map