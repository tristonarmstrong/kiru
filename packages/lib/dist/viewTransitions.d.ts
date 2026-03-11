export declare namespace ViewTransitions {
    function run<T>(callback: () => T | Promise<T>, options?: {
        signal?: AbortSignal;
    }): Promise<T>;
    function stop(): void;
}
//# sourceMappingURL=viewTransitions.d.ts.map