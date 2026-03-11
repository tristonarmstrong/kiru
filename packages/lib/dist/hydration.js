const parents = [];
const childIdx = [];
export const hydrationStack = {
    bumpChildIndex() {
        childIdx[childIdx.length - 1]++;
    },
    getCurrentChild() {
        const idx = childIdx[childIdx.length - 1];
        // @ts-expect-error TODO: We're ignoring the possibility of encountering comment or cdata nodes.
        // Not really a problem for now since we don't render those but should be checked anyway.
        return this.getCurrentParent().childNodes[idx];
    },
    getCurrentParent() {
        return parents[parents.length - 1];
    },
    clear() {
        parents.length = 0;
        childIdx.length = 0;
    },
    pop() {
        parents.pop();
        childIdx.pop();
    },
    push(el) {
        parents.push(el);
        childIdx.push(0);
    },
};
//# sourceMappingURL=hydration.js.map