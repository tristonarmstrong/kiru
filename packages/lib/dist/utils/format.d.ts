export { className, encodeHtmlEntities, propFilters, propToHtmlAttr, styleObjectToString, propValueToHtmlAttrValue, propsToElementAttributes, safeStringify, };
declare function className(...classes: (string | false | null | undefined)[]): string;
declare function encodeHtmlEntities(text: string): string;
declare const propFilters: {
    isInternalProp: (key: string) => key is "children" | "ref" | "key" | "innerHTML";
    isEvent: (key: string) => boolean;
    isStringRenderableProperty: (key: string) => boolean;
};
declare function propToHtmlAttr(key: string): string;
declare function styleObjectToString(obj: Partial<CSSStyleDeclaration>): string;
declare function propValueToHtmlAttrValue(key: string, value: unknown): string;
declare function propsToElementAttributes(props: Record<string, unknown>): string;
type SafeStringifyOptions = {
    /**
     * By default, functions are stringified. Specify `false` to instead produce `[FUNCTION (${fn.name})]`.
     */
    functions: boolean;
};
declare function safeStringify(value: unknown, opts?: SafeStringifyOptions): string;
//# sourceMappingURL=format.d.ts.map