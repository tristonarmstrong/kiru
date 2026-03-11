import { hydrationStack } from "../hydration.js";
import { hydrationMode, renderMode } from "../globals.js";
import { mount } from "../index.js";
export function hydrate(children, container, options) {
    hydrationStack.clear();
    const prevRenderMode = renderMode.current;
    renderMode.current = "hydrate";
    const prevHydrationMode = hydrationMode.current;
    hydrationMode.current = options?.hydrationMode ?? "dynamic";
    const app = mount(children, container, options);
    renderMode.current = prevRenderMode;
    hydrationMode.current = prevHydrationMode;
    return app;
}
//# sourceMappingURL=client.js.map