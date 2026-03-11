export function isPrimitiveChild(value) {
    return (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "bigint" ||
        typeof value === "boolean" ||
        value === undefined ||
        value === null);
}
//# sourceMappingURL=dom.js.map