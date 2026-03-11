export class ActionError extends Error {
    constructor(cause) {
        super("Error occurred during action execution", { cause });
    }
}
export function defineAction(callback) {
    return async (...args) => {
        const { execute, onError } = callback(...args);
        try {
            const data = await execute();
            return { error: null, data };
        }
        catch (e) {
            const error = new ActionError(e);
            onError?.(error);
            return { error, data: null };
        }
    };
}
//# sourceMappingURL=action.js.map