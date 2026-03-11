const DEFAULT_CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";
/**
 * Generates a random id
 * @param {number} [size=10] size of the id (in number of characters)
 * @param {string} [characterSet=defaultCharacterSet] set of characters to be used in the generation of the id
 * @returns {string} random id of length {@link size}
 */
export function generateRandomID(size = 10, characterSet = DEFAULT_CHARACTERS) {
    let id = "";
    for (let i = 0; i < size; i++) {
        id += characterSet[(Math.random() * characterSet.length) | 0]; // bitwise OR `|` is faster than `Math.floor()`
    }
    return id;
}
//# sourceMappingURL=generateId.js.map