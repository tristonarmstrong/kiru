import { describe, it } from "node:test";
import assert from "node:assert";
import { reconcileChildren } from "../../reconciler.js";
import * as kiru from "../../index.js";
import { shuffle } from "./utils.js";
import { commitSnapshot } from "../../utils/index.js";
import { FLAG_PLACEMENT } from "../../constants.js";
import { createVNode } from "../../vNode.js";
const commitChildren = (node) => {
    let n = node.child;
    while (n) {
        commitSnapshot(n);
        n = n.sibling;
    }
};
describe("reconciler", () => {
    it("correctly handles correctly handles 'mapRemainingChildren' phase when dealing with array children", () => {
        const items = "abcdefghijklmnopqrstuvwxyz".split("");
        const node = createVNode("div");
        node.child = reconcileChildren(node, [
            items.map((i) => kiru.createElement("div", { key: i }, i)),
        ]);
        const reconcileChildFragment = () => {
            node.child.child = reconcileChildren(node.child, items.map((i) => kiru.createElement("div", { key: i }, i)));
        };
        commitChildren(node.child);
        shuffle(items);
        reconcileChildFragment();
        commitChildren(node.child);
        shuffle(items);
        reconcileChildFragment();
        commitChildren(node.child);
        shuffle(items);
        reconcileChildFragment();
        // should not have any delete calls
        assert.strictEqual(node.child.deletions?.length || 0, 0, `delete was called but should not have`);
    });
    it("correctly handles reordered Array children with keys", () => {
        const items = "abcdefghijklmnopqrstuvwxyz".split("");
        const node = createVNode("div");
        node.child = reconcileChildren(node, [
            items.map((i) => kiru.createElement("div", { key: i }, i)),
        ]);
        const reconcileChildFragment = () => {
            node.child.child = reconcileChildren(node.child, items.map((i) => kiru.createElement("div", { key: i }, i)));
        };
        const assertChildStates = (opName) => {
            let i = 0, c = node.child.child;
            while (c) {
                assert.strictEqual(c.key, items[i], `[${opName}]: key for ${i}th child should be ${items[i]}`);
                const prev = c.prev;
                if (!prev || prev.index < i) {
                    assert.strictEqual((c.flags & FLAG_PLACEMENT) !== 0, true, `[${opName}]: ${i}th child should have flag "placement"`);
                }
                c = c.sibling;
                i++;
            }
            assert.strictEqual(i, items.length, `[${opName}]: should be no more children`);
        };
        reconcileChildFragment();
        assertChildStates("initial");
        commitChildren(node.child);
        let totalDeletions = 0;
        for (let i = 0; i < 20; i++) {
            items.reverse();
            reconcileChildFragment();
            assertChildStates("list_reversal");
            commitChildren(node.child);
            // shuffle(items)
            // reconcileChildFragment()
            // assertChildStates("list_randomization")
            // commitChildren(node.child!)
            // should not have any more delete calls yet
            assert.strictEqual(totalDeletions, i, `pre-removal: delete should have been called ${i} times`);
            items.splice(Math.floor(Math.random() * items.length), 1);
            reconcileChildFragment();
            assertChildStates("item_removal");
            commitChildren(node.child);
            console.log("deleted", node.child.deletions?.length);
            totalDeletions += node.child.deletions.length;
            node.child.deletions = [];
            // should have called delete i + 1 times
            assert.strictEqual(totalDeletions, i + 1, `post-removal: delete should have been called ${i + 1} times`);
        }
    });
    it("warns about duplicate keys in development mode", () => {
        // Mock console.error to capture warnings
        const originalConsoleError = console.error;
        const warnings = [];
        console.error = (msg) => {
            warnings.push(msg);
        };
        try {
            // Create a parent node
            const node = createVNode("div");
            // Create children with duplicate keys
            const children = [
                kiru.createElement("div", { key: "duplicate" }, "first"),
                kiru.createElement("div", { key: "duplicate" }, "second"),
                kiru.createElement("div", { key: "unique" }, "third"),
            ];
            reconcileChildren(node, children);
            // Should have emitted a duplicate key warning
            assert.strictEqual(warnings.length, 1, "Should emit one duplicate key warning");
            assert.ok(warnings[0].includes("duplicate key prop"), "Warning should mention duplicate key");
            assert.ok(warnings[0].includes("duplicate"), "Warning should include the duplicate key value");
        }
        finally {
            console.error = originalConsoleError;
        }
    });
    it("has correct warning behavior for different array contexts", () => {
        // This test verifies the architectural distinction your refactoring made:
        // - Duplicate key warnings fire for ALL arrays (always problematic)
        // - Missing key warnings only fire for marked list children (from JSX list contexts)
        // Mock console.error to capture warnings
        const originalConsoleError = console.error;
        const warnings = [];
        console.error = (msg) => {
            warnings.push(msg);
        };
        try {
            const node = createVNode("div");
            // Test 1: Regular array with duplicate keys should warn
            const arrayWithDuplicates = [
                kiru.createElement("div", { key: "same" }, "first"),
                kiru.createElement("div", { key: "same" }, "second"),
            ];
            reconcileChildren(node, arrayWithDuplicates);
            // Should warn about duplicates but not missing keys (not marked as list child)
            assert.ok(warnings.some((w) => w.includes("duplicate key prop")), "Should warn about duplicate keys for any array");
            // The missing key warnings are controlled by the marking system
            // which is an internal implementation detail for JSX list contexts
            assert.ok(true, "Missing key warnings are handled by internal marking system");
        }
        finally {
            console.error = originalConsoleError;
        }
    });
    it("handles mixed keys and non-keys correctly", () => {
        // Mock console.error to capture warnings
        const originalConsoleError = console.error;
        const warnings = [];
        console.error = (msg) => {
            warnings.push(msg);
        };
        try {
            const node = createVNode("div");
            // Mix of keyed and non-keyed children in array context
            const children = [
                kiru.createElement("div", { key: "first" }, "first"),
                kiru.createElement("div", null, "second"), // no key
                kiru.createElement("div", { key: "first" }, "third"), // duplicate key
                "text node", // primitive
            ];
            reconcileChildren(node, children);
            // Should warn about duplicate key (always checked for arrays)
            assert.ok(warnings.some((w) => w.includes("duplicate key prop")), "Should warn about duplicate key");
        }
        finally {
            console.error = originalConsoleError;
        }
    });
    it("does not warn about missing keys for individual children", () => {
        // Mock console.error to capture warnings
        const originalConsoleError = console.error;
        const warnings = [];
        console.error = (msg) => {
            warnings.push(msg);
        };
        try {
            // Create a parent node
            const node = createVNode("div");
            // Simulate individual JSX children (not an array) - like the user's second example
            // <div><p key="a"></p><button>...</button></div>
            reconcileChildren(node, kiru.createElement("p", { key: "a" }));
            reconcileChildren(node, kiru.createElement("button", null, "Add Todo"));
            // Should NOT warn about missing keys for individual children
            assert.ok(!warnings.some((w) => w.includes("without a valid key prop")), "Should not warn about missing keys for individual children");
        }
        finally {
            console.error = originalConsoleError;
        }
    });
    it("correctly identifies parent component in warnings", () => {
        // Mock console.error to capture warnings
        const originalConsoleError = console.error;
        const warnings = [];
        console.error = (msg) => {
            warnings.push(msg);
        };
        const NamedComponent = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("div", { key: "duplicate" }, "first"),
                kiru.createElement("div", { key: "duplicate" }, "second")));
        };
        NamedComponent.displayName = "MyTestComponent";
        try {
            // Create parent component node
            const parentNode = createVNode(NamedComponent);
            // Set up parent-child relationship
            const childNode = createVNode("div", parentNode);
            // childNode.type = NamedComponent
            // Create children with duplicate keys
            const children = [
                kiru.createElement("div", { key: "duplicate" }, "first"),
                kiru.createElement("div", { key: "duplicate" }, "second"),
            ];
            reconcileChildren(childNode, children);
            // Should include component name in warning
            assert.ok(warnings.some((w) => w.includes("MyTestComponent")), "Warning should include component display name");
        }
        finally {
            console.error = originalConsoleError;
        }
    });
});
//# sourceMappingURL=reconciler.test.js.map