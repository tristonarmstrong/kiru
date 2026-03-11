type VNode = Kiru.VNode;
/**
 * Runs a function after any existing work has been completed,
 * or immediately if the scheduler is already idle.
 */
export declare function nextIdle(fn: () => void): void;
/**
 * Syncronously flushes any pending work.
 */
export declare function flushSync(): void;
export declare function renderRootSync(rootNode: VNode): void;
/**
 * Queues a node for an update. Has no effect if the node is already deleted or marked for deletion.
 */
export declare function requestUpdate(vNode: VNode): void;
export declare function useRequestUpdate(): () => void;
export {};
//# sourceMappingURL=scheduler.d.ts.map