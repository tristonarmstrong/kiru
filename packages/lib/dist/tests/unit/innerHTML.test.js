import { describe, it } from "node:test";
import assert from "node:assert";
import { renderToString } from "../../renderToString.js";
import * as kiru from "../../index.js";
describe("innerHTML", () => {
    it("sets the inner content of the tag", () => {
        const App = () => {
            return kiru.createElement("div", { innerHTML: "Hello world!" });
        };
        const expected = `<div>Hello world!</div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("can use a Signal to set the inner content of the tag", () => {
        const text = kiru.signal("Hello world!");
        const App = () => {
            return kiru.createElement("div", { innerHTML: text });
        };
        const expected = `<div>Hello world!</div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("enforces that no children should be provided if specified", () => {
        const App = () => {
            return (kiru.createElement("div", { innerHTML: "Hello world!" },
                kiru.createElement("h1", null, "Hello world")));
        };
        assert.throws(() => {
            renderToString(kiru.createElement(App, null));
        });
    });
});
//# sourceMappingURL=innerHTML.test.js.map