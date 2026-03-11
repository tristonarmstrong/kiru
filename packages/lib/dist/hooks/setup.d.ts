import { Signal } from "../signals/base.js";
export interface Setup<Props extends {}> {
    readonly derive: <T>(selector: (props: Props extends Kiru.FC<infer P> ? P : Props) => T) => Signal<T>;
    readonly id: Signal<string>;
}
/**
 * Creates a per‑VNode setup context that can be used during
 * component setup to derive props into signals.
 *
 * @see https://kirujs.dev/docs/api/lifecycles#setup
 */
export declare function setup<Props extends {}>(): Setup<Props>;
//# sourceMappingURL=setup.d.ts.map