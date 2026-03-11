import { describe, it } from "node:test";
import assert from "node:assert";
import { renderToString } from "../../renderToString.js";
import * as kiru from "../../index.js";
describe("renderToString", () => {
    it("produces HTML with styles formatted correctly", () => {
        const App = () => {
            return (kiru.createElement("div", { style: "display:flex;" },
                kiru.createElement("h1", { style: { color: "red" } }, "Hello world")));
        };
        const expected = `<div style="display:flex;"><h1 style="color:red;">Hello world</h1></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("is able to derive Context correctly", () => {
        const MyContext = kiru.createContext("test");
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement(MyContext, { value: "test123" },
                    kiru.createElement(ChildComponent, null))));
        };
        const ChildComponent = () => {
            const ctx = kiru.useContext(MyContext);
            return kiru.createElement("h1", null, ctx);
        };
        const expected = `<div><h1>test123</h1></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("is able to use Signals for text content", () => {
        const text = kiru.signal("Hello world!");
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("h1", null, text)));
        };
        const expected = `<div><h1>Hello world!</h1></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("is able to use Signals for DOM attributes", () => {
        const className = kiru.signal("main-header");
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("h1", { className: className }, "Hello world!")));
        };
        const expected = `<div><h1 class="main-header">Hello world!</h1></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("does not render null, boolean or undefined values", () => {
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("h1", null, "Hello world!"),
                kiru.createElement(NullComponent, null),
                kiru.createElement(UndefinedComponent, null),
                kiru.createElement(BooleanComponent, null)));
        };
        const NullComponent = () => null;
        const UndefinedComponent = () => undefined;
        const BooleanComponent = () => true;
        const expected = `<div><h1>Hello world!</h1></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("correctly renders boolean attributes", () => {
        const checked = kiru.signal(true);
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("input", { type: "checkbox", checked: checked, disabled: false })));
        };
        const expected = `<div><input type="checkbox" checked></div>`;
        const res = renderToString(kiru.createElement(App, null));
        assert.strictEqual(res, expected);
    });
    it("normalizes bind:value to a value attribute in SSR", () => {
        const n = kiru.signal(42);
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("input", { type: "range", "bind:value": n, max: 5 })));
        };
        const res = renderToString(kiru.createElement(App, null));
        assert.ok(res.includes('type="range"'));
        assert.ok(res.includes('max="5"'));
        assert.ok(res.includes('value="42"'));
    });
    it("normalizes bind:checked to a checked attribute in SSR", () => {
        const checked = kiru.signal(true);
        const App = () => {
            return (kiru.createElement("div", null,
                kiru.createElement("input", { type: "checkbox", "bind:checked": checked })));
        };
        const res = renderToString(kiru.createElement(App, null));
        assert.ok(res.includes('type="checkbox"'));
        assert.ok(res.includes("checked"));
    });
});
//# sourceMappingURL=renderToString.test.js.map