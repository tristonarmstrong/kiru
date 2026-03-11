interface FCModule {
    default: Kiru.FC<any>;
}
type LazyImportValue = Kiru.FC<any> | FCModule;
type InferLazyImportProps<T extends LazyImportValue> = T extends FCModule ? Kiru.InferProps<T["default"]> : Kiru.InferProps<T>;
type LazyComponentProps<T extends LazyImportValue> = InferLazyImportProps<T> & {
    fallback?: JSX.Element;
};
/**
 * Lazy loads a component and renders it when it is ready.
 * @see https://kirujs.dev/docs/components/lazy
 */
export declare function lazy<T extends LazyImportValue>(componentPromiseFn: () => Promise<T>): Kiru.FC<LazyComponentProps<T>>;
export {};
//# sourceMappingURL=lazy.d.ts.map