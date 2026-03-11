import { $STREAM_DATA } from "./constants.js";
import { Signal } from "./signals/base.js";
export interface StreamDataThrowValue {
    [$STREAM_DATA]: {
        fallback?: JSX.Element;
        data: Kiru.StatefulPromiseBase<unknown>[];
    };
}
/**
 * Returns true if the value is a {@link StreamDataThrowValue}
 */
export declare function isStreamDataThrowValue(value: unknown): value is StreamDataThrowValue;
/**
 * Returns true if the value is a {@link Kiru.StatefulPromiseBase}
 */
export declare function isStatefulPromise(thing: unknown): thing is Kiru.StatefulPromiseBase<unknown>;
type StatefulPromise<T> = Kiru.StatefulPromiseBase<T> & {
    isPending: Signal<boolean>;
};
export declare function statefulPromise<T>(callback: (signal: AbortSignal) => Promise<T>): StatefulPromise<T>;
export {};
//# sourceMappingURL=statefulPromise.d.ts.map