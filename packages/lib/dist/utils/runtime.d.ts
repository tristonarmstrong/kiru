export { call, noop, latest, composeRefs, setRef, sideEffectsEnabled };
declare function call(fn: Function): void;
declare const noop: () => void;
/**
 * This is a no-op in production. It is used to get the latest
 * iteration of a component or signal after HMR has happened.
 */
declare function latest<T extends Exclude<object, null>>(thing: T): T;
/**
 * Composes multiple refs into a single ref callback.
 */
declare function composeRefs<T>(...refs: Array<Kiru.Ref<T>>): Kiru.RefCallback<T>;
/**
 * Sets the value of a ref.
 */
declare function setRef<T>(ref: Kiru.Ref<T>, value: T): void;
/**
 * Returns false if called during "stream" or "string" render modes.
 */
declare function sideEffectsEnabled(): boolean;
//# sourceMappingURL=runtime.d.ts.map