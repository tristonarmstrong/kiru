export type ActionResult<T> = {
    error: ActionError;
    data: null;
} | {
    error: null;
    data: T;
};
export interface ActionConfig<T> {
    /**
     * Executes the action and returns the result.
     */
    execute: () => Promise<T>;
    /**
     * Called when the action fails.
     */
    onError?: (error: ActionError) => void;
}
export declare class ActionError extends Error {
    constructor(cause: unknown);
}
export declare function defineAction<T extends readonly unknown[], R>(callback: (...args: T) => ActionConfig<R>): (...args: T) => Promise<ActionResult<R>>;
//# sourceMappingURL=action.d.ts.map