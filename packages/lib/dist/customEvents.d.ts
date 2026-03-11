export declare class CustomEvents {
    private constructor();
    static on<K extends keyof Kiru.CustomEvents & string>(type: K, callback: (event: CustomEvent<Kiru.CustomEvents[K]>) => void): () => void;
    static dispatch<K extends keyof Kiru.CustomEvents & string>(type: K, detail: Kiru.CustomEvents[K], target?: Element): void;
}
//# sourceMappingURL=customEvents.d.ts.map