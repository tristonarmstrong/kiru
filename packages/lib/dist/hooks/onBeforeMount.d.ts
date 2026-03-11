/**
 * Registers a callback that runs after the component is first mounted to the DOM, but before the DOM is painted.
 * Optionally returns a cleanup function that will run when the component unmounts.
 * Intended for use during component setup when the component returns a render function.
 *
 * @see https://kirujs.dev/docs/api/lifecycles#onBeforeMount
 */
export declare function onBeforeMount(fn: () => (() => void) | void): void;
//# sourceMappingURL=onBeforeMount.d.ts.map