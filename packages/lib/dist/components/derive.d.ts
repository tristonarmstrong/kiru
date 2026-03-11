import type { RecordHas } from "../types.utils";
export type Derivable = Kiru.Signal<unknown> | Kiru.StatefulPromiseBase<unknown> | Record<string, Kiru.Signal<unknown> | Kiru.StatefulPromiseBase<unknown>>;
type InnerOf<T> = T extends Kiru.Signal<infer V> ? V : T extends Kiru.StatefulPromiseBase<infer P> ? P : never;
type UnwrapDerive<T extends Derivable> = T extends Kiru.Signal<unknown> | Kiru.StatefulPromiseBase<any> ? InnerOf<T> : {
    [K in keyof T]: InnerOf<T[K]>;
};
type RecordHasPromise<T extends Record<string, any>> = RecordHas<T, Kiru.StatefulPromiseBase<any>>;
type ChildFn<T> = (value: T) => JSX.Children;
type ChildFnWithStale<T> = (value: T, isStale: boolean) => JSX.Children;
export type DeriveFallbackMode = "swr" | "fallback";
export interface DeriveProps<T extends Derivable, Mode extends DeriveFallbackMode = "fallback"> {
    from: T;
    mode?: Mode;
    children: T extends Kiru.StatefulPromiseBase<infer U> ? Mode extends "swr" ? ChildFnWithStale<U> : ChildFn<U> : T extends Record<string, any> ? RecordHasPromise<T> extends true ? Mode extends "swr" ? ChildFnWithStale<UnwrapDerive<T>> : ChildFn<UnwrapDerive<T>> : ChildFn<UnwrapDerive<T>> : ChildFn<UnwrapDerive<T>>;
    fallback?: T extends Kiru.StatefulPromiseBase<any> ? JSX.Element : T extends Record<string, any> ? RecordHasPromise<T> extends true ? JSX.Element : never : never;
}
type Derive = {
    <T extends Derivable, U extends DeriveFallbackMode = "swr">(props: DeriveProps<T, U>): (props: DeriveProps<T, U>) => JSX.Element;
};
/**
 * Derives a value from a signal or stateful promise and renders a child component.
 * @see https://kirujs.dev/docs/components/derive
 */
export declare const Derive: Derive;
export {};
//# sourceMappingURL=derive.d.ts.map