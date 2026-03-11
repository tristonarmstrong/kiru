const storageKey = "kiru:filerouter:scroll";
export const scrollStack = {
    get() {
        const fromStorage = sessionStorage.getItem(storageKey);
        if (fromStorage) {
            return JSON.parse(fromStorage);
        }
        return [];
    },
    getItem(index) {
        const scrollStack = this.get();
        return scrollStack[index];
    },
    replace(index, x, y) {
        const scrollStack = this.get();
        scrollStack[index] = [x, y];
        this.save(scrollStack);
    },
    save(scrollStack) {
        sessionStorage.setItem(storageKey, JSON.stringify(scrollStack));
    },
};
//# sourceMappingURL=scrollStack.js.map