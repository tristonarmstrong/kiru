export class FileRouterDataLoadError extends Error {
    constructor(cause) {
        super("An error occurred while loading route data");
        this.cause = cause;
    }
}
//# sourceMappingURL=errors.js.map