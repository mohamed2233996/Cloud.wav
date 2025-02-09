
/**
 * @param {string} key
 * @param {any} value 
 */
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @param {string} key
 * @returns {any}
 */
export const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

/**
 * @param {string} key 
 */
export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};

/**
 */
export const clearLocalStorage = () => {
    localStorage.clear();
};
