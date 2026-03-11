export interface HeadlessRenderContext {
    write(chunk: string): void;
    onStreamData?: (data: Kiru.StatefulPromiseBase<unknown>[]) => void;
}
export declare function headlessRender(ctx: HeadlessRenderContext, el: unknown, parent: Kiru.VNode | null, idx: number): void;
//# sourceMappingURL=headlessRender.d.ts.map