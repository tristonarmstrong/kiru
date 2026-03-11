import { svgTags, FLAG_PLACEMENT, FLAG_STATIC_DOM } from "../constants.js";
import { Signal } from "../signals/base.js";
import { unwrap } from "../signals/utils.js";
import { hydrationStack } from "../hydration.js";
import { getVNodeApp, isValidTextChild, latest, registerVNodeCleanup, } from "../utils/index.js";
import { KiruError } from "../error.js";
import { __DEV__, isBrowser } from "../env.js";
import { updateDomProps } from "./props.js";
export { createDom, hydrateDom, getDomParent, placeDom };
function createDom(vNode) {
    const t = vNode.type;
    const dom = t == "#text"
        ? createTextNode(vNode)
        : svgTags.has(t)
            ? document.createElementNS("http://www.w3.org/2000/svg", t)
            : document.createElement(t);
    return dom;
}
function hydrateDom(vNode) {
    const dom = vNode.type === "#text"
        ? getOrCreateTextNode(vNode)
        : hydrationStack.getCurrentChild();
    hydrationStack.bumpChildIndex();
    if (!dom) {
        throw new KiruError({
            message: `Hydration mismatch - no node found`,
            vNode,
        });
    }
    let nodeName = dom.nodeName;
    if (!svgTags.has(nodeName)) {
        nodeName = nodeName.toLowerCase();
    }
    if (vNode.type !== nodeName) {
        throw new KiruError({
            message: `Hydration mismatch - expected node of type ${vNode.type.toString()} but received ${nodeName}`,
            vNode,
        });
    }
    vNode.dom = dom;
    if (vNode.type !== "#text" && !(vNode.flags & FLAG_STATIC_DOM)) {
        updateDomProps(vNode);
        return;
    }
    if (Signal.isSignal(vNode.props.nodeValue)) {
        subTextNode(vNode, dom, vNode.props.nodeValue);
    }
    let prev = vNode;
    let sibling = vNode.sibling;
    while (sibling && sibling.type === "#text") {
        const sib = sibling;
        hydrationStack.bumpChildIndex();
        const prevText = String(unwrap(prev.props.nodeValue) ?? "");
        const dom = prev.dom.splitText(prevText.length);
        sib.dom = dom;
        if (Signal.isSignal(sib.props.nodeValue)) {
            subTextNode(sib, dom, sib.props.nodeValue);
        }
        prev = sibling;
        sibling = sibling.sibling;
    }
}
function getDomParent(vNode) {
    let parentNode = vNode.parent;
    let parentNodeElement = parentNode?.dom;
    while (parentNode && !parentNodeElement) {
        parentNode = parentNode.parent;
        parentNodeElement = parentNode?.dom;
    }
    if (!parentNodeElement || !parentNode) {
        if (!vNode.parent && vNode.dom) {
            return vNode;
        }
        throw new KiruError({
            message: "No DOM parent found while attempting to place node.",
            vNode: vNode,
        });
    }
    return parentNode;
}
function placeDom(vNode, hostNode) {
    const { node: parentVNodeWithDom, lastChild } = hostNode;
    const dom = vNode.dom;
    if (lastChild) {
        lastChild.after(dom);
        return;
    }
    const nextSiblingDom = getNextSiblingDom(vNode, parentVNodeWithDom);
    if (nextSiblingDom) {
        parentVNodeWithDom.dom.insertBefore(dom, nextSiblingDom);
        return;
    }
    parentVNodeWithDom.dom.appendChild(dom);
}
function getNextSiblingDom(vNode, parent) {
    let node = vNode;
    while (node) {
        let sibling = node.sibling;
        while (sibling) {
            if (!(sibling.flags & (FLAG_PLACEMENT | FLAG_STATIC_DOM))) {
                const dom = findFirstHostDom(sibling);
                if (dom?.isConnected)
                    return dom;
            }
            sibling = sibling.sibling;
        }
        node = node.parent;
        if (!node || node.flags & FLAG_STATIC_DOM || node === parent) {
            return;
        }
    }
    return;
}
function findFirstHostDom(vNode) {
    let node = vNode;
    while (node) {
        if (node.dom)
            return node.dom;
        if (node.flags & FLAG_STATIC_DOM)
            return;
        node = node.child;
    }
    return;
}
function getOrCreateTextNode(vNode) {
    const sig = vNode.props.nodeValue;
    if (!Signal.isSignal(sig)) {
        return hydrationStack.getCurrentChild();
    }
    const value = sig.peek();
    if (isValidTextChild(value)) {
        return hydrationStack.getCurrentChild();
    }
    const dom = createSignalTextNode(vNode, sig);
    const currentChild = hydrationStack.getCurrentChild();
    if (!currentChild) {
        return hydrationStack.getCurrentParent().appendChild(dom);
    }
    currentChild.before(dom);
    return dom;
}
function subTextNode(vNode, textNode, signal) {
    if (__DEV__)
        signal = latest(signal);
    const cleanup = signal.subscribe((value, prev) => {
        if (value === prev)
            return;
        textNode.nodeValue = value;
        if (__DEV__ && isBrowser) {
            window.__kiru?.profilingContext?.emit("signalTextUpdate", getVNodeApp(vNode));
        }
    });
    registerVNodeCleanup(vNode, "nodeValue", cleanup);
}
function createTextNode(vNode) {
    const { nodeValue } = vNode.props;
    if (Signal.isSignal(nodeValue)) {
        return createSignalTextNode(vNode, nodeValue);
    }
    return document.createTextNode(nodeValue);
}
function createSignalTextNode(vNode, nodeValue) {
    if (__DEV__)
        nodeValue = latest(nodeValue);
    const value = nodeValue.peek() ?? "";
    const textNode = document.createTextNode(value);
    subTextNode(vNode, textNode, nodeValue);
    return textNode;
}
//# sourceMappingURL=nodes.js.map