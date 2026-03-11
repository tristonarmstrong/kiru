export class CustomEvents {
    constructor() { }
    static on(type, callback) {
        window.addEventListener(type, callback);
        return () => window.removeEventListener(type, callback);
    }
    static dispatch(type, detail, target) {
        ;
        (target || document).dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
    }
}
//# sourceMappingURL=customEvents.js.map