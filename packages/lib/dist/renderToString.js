import { renderMode } from "./globals.js";
import { Fragment } from "./element.js";
import { headlessRender } from "./headlessRender.js";
export function renderToString(element) {
    const prev = renderMode.current;
    renderMode.current = "string";
    let result = "";
    const ctx = {
        write(chunk) {
            result += chunk;
        },
    };
    headlessRender(ctx, Fragment({ children: element }), null, 0);
    renderMode.current = prev;
    return result;
}
//# sourceMappingURL=renderToString.js.map