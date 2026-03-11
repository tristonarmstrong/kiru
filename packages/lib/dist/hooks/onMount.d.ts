/**
 * Registers a callback that runs after the component is first mounted to the DOM.
 * Optionally returns a cleanup function that will run after the component unmounts.
 * Intended for use during component setup when the component returns a render function.
 *
 * @see https://kirujs.dev/docs/api/lifecycles#onMount
 */
export declare function onMount(fn: () => (() => void) | void): void;
//# sourceMappingURL=onMount.d.ts.map