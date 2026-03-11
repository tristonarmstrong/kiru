import { $KIRU_ERROR } from "./constants.js";
type KiruErrorOptions = string | {
    message: string;
    /** Used to indicate that the error is fatal and should crash the application */
    fatal?: boolean;
    /** Used to generate custom node stack */
    vNode?: Kiru.VNode;
};
export declare class KiruError extends Error {
    [$KIRU_ERROR]: boolean;
    /** Indicates whether the error is fatal and should crash the application */
    fatal?: boolean;
    /** Present if vNode is provided */
    customNodeStack?: string;
    constructor(optionsOrMessage: KiruErrorOptions);
    static isKiruError(error: unknown): error is KiruError;
}
export {};
//# sourceMappingURL=error.d.ts.map