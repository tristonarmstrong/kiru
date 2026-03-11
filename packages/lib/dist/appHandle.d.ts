type VNode = Kiru.VNode;
export interface AppHandleOptions {
    /**
     * App name - shown in devtools
     */
    name?: string;
}
export interface AppHandle {
    id: number;
    name: string;
    rootNode: VNode;
    render(children: JSX.Element): void;
    unmount(): void;
}
export declare function mount(children: JSX.Element, container: Kiru.ContainerElement, options?: AppHandleOptions): AppHandle;
export {};
//# sourceMappingURL=appHandle.d.ts.map