
/**
 * @param {string} username
 * @returns {boolean}
 */
export const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
};

/**
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};


/**
 * @param {string} password 
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};
