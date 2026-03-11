let focussedElement = null;
export function captureFocus() {
    const el = document.activeElement;
    if (el === document.body || !(el instanceof HTMLElement)) {
        return;
    }
    el.addEventListener("blur", placementBlurHandler);
    focussedElement = el;
}
export function reinstateFocus() {
    if (focussedElement) {
        focussedElement.removeEventListener("blur", placementBlurHandler);
        if (focussedElement.isConnected)
            focussedElement.focus();
        focussedElement = null;
    }
}
export function wrapFocusEventHandler(callback) {
    return (event) => {
        if (focussedElement) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        callback(event);
    };
}
function placementBlurHandler(event) {
    event.preventDefault();
    event.stopPropagation();
}
//# sourceMappingURL=focus.js.map