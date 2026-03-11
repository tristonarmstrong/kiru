import { FLAG_STATIC_DOM } from "./constants.js";
import { __DEV__ } from "./env.js";
import { renderRootSync } from "./scheduler.js";
import { createVNode } from "./vNode.js";
let appId = 0;
export function mount(children, container, options) {
    if (__DEV__ && container.__kiruNode) {
        return container.__kiruNode.app;
    }
    const rootNode = createRootNode(container);
    const id = appId++;
    const name = options?.name ?? `App-${id}`;
    const app = {
        id,
        name,
        rootNode,
        render,
        unmount,
    };
    function render(children) {
        rootNode.props = { children };
        renderRootSync(rootNode);
    }
    function unmount() {
        rootNode.props = { children: null };
        renderRootSync(rootNode);
        if (__DEV__) {
            delete container.__kiruNode;
            delete rootNode.app;
        }
        window.__kiru.emit("unmount", app);
    }
    if (__DEV__) {
        rootNode.app = app;
    }
    render(children);
    window.__kiru.emit("mount", app);
    // @ts-expect-error
    if (__DEV__ && !globalThis.__KIRU_READY__) {
        // @ts-expect-error
        globalThis.__KIRU_READY__ = true;
        queueMicrotask(() => {
            window.dispatchEvent(new Event("kiru:ready"));
        });
    }
    return app;
}
function createRootNode(container) {
    const node = createVNode(container.nodeName.toLowerCase());
    node.flags |= FLAG_STATIC_DOM;
    node.dom = container;
    if (__DEV__) {
        container.__kiruNode = node;
    }
    return node;
}
//# sourceMappingURL=appHandle.js.map