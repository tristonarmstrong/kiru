interface PortalProps {
    children?: JSX.Children;
    container: HTMLElement | (() => HTMLElement);
}
/**
 * Escapes the application DOM tree and renders a child component in the given container.
 * @see https://kirujs.dev/docs/components/portal
 */
export declare function Portal({ children, container }: PortalProps): JSX.Children;
export {};
//# sourceMappingURL=portal.d.ts.map