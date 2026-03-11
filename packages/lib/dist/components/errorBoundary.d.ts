export interface ErrorBoundaryProps {
    children?: JSX.Children;
    fallback?: JSX.Element | ((error: Error) => JSX.Element);
    onError?: (error: Error) => void;
}
/**
 * Catches errors in the children and renders a fallback component.
 * @see https://kirujs.dev/docs/components/error-boundary
 */
export declare function ErrorBoundary({ children, fallback, onError, }: ErrorBoundaryProps): Kiru.Element;
//# sourceMappingURL=errorBoundary.d.ts.map