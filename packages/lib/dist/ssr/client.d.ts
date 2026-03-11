import type { AppHandle, AppHandleOptions } from "../appHandle";
interface AppHandleHydrationOptions extends AppHandleOptions {
    /**
     * Configures the hydration mode
     * - "static": SSG
     * - "dynamic": SSR with lazy promise hydration
     * @default "dynamic"
     */
    hydrationMode?: "static" | "dynamic";
}
export declare function hydrate(children: JSX.Element, container: HTMLElement, options?: AppHandleHydrationOptions): AppHandle;
export {};
//# sourceMappingURL=client.d.ts.map