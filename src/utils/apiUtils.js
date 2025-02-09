import { isValidEmail, isValidPassword, isValidUsername } from "./authUtils";

/**
 * @param {string} email 
 * @param {string} username
 * @returns {Promise<boolean>}
 */
export const checkIfUserExists = async (email, username) => {
    try {
        const response = await fetch('https://catfact.ninja/fact/check-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username }),
        });

        if (!response.ok) {
            throw new Error('فشل في التحقق من المستخدم');
        }

        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error during user existence check:', error);
        throw error;
    }
};


/**
 * @param {object} userData
 * @returns {Promise<object>}
 */
export const registerUser = async (userData) => {
    const { email, password, username } = userData;

    if (!isValidEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
    }
    if (!isValidPassword(password)) {
        throw new Error('كلمة المرور ضعيفة');
    }
    if (!isValidUsername(username)) {
        throw new Error('الاسم غير صحيح');
    }

    const userExists = await checkIfUserExists(email, username);
    if (userExists) {
        throw new Error('البريد الإلكتروني أو اسم المستخدم موجود بالفعل');
    }


    try {
        const response = await fetch('https://catfact.ninja/fact/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                username,
            }),
        });

        if (!response.ok) {
            throw new Error('فشل في التسجيل، تحقق من البيانات المدخلة');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};



/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
export const login = async (email, password) => {
    try {
        const response = await fetch('https://catfact.ninja/fact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('فشل في تسجيل الدخول');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * @param {string} token
 * @returns {Promise<object>}
 */
export const fetchUserData = async (token) => {
    try {
        const response = await fetch('https://catfact.ninja/fact', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('فشل في جلب البيانات');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
