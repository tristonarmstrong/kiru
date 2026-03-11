import type { ElementProps } from "../types";
export interface LinkProps extends ElementProps<"a"> {
    /**
     * The path to navigate to
     * @example
     * <Link to="/about">About</Link>
     */
    to: string;
    /**
     * Whether to replace the current history entry
     * @default false
     */
    replace?: boolean;
    /**
     * Whether to trigger a view transition
     * @default false (overrides transition from config)
     */
    transition?: boolean;
    /**
     * Whether to prefetch the route's javascript dependencies when hovered or focused
     * @default true
     */
    prefetchJs?: boolean;
}
export declare const Link: Kiru.FC<LinkProps>;
//# sourceMappingURL=link.d.ts.map