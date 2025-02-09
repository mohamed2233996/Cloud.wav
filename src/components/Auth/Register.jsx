import React, { useState } from 'react';
import { registerUser } from '../../utils/apiUtils';
import { isValidEmail, isValidPassword, isValidUsername } from '../../utils/authUtils';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUsername(username)) {
            setError('اسم المستخدم يجب أن يكون بين 3 و 20 حرفًا ويحتوي على أحرف وأرقام فقط');
            return;
        }

        if (!isValidEmail(email)) {
            setError('البريد الإلكتروني غير صالح');
            return;
        }
        if (!isValidPassword(password)) {
            setError('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير ورقم');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await registerUser({ email, password, username });
            console.log('تم التسجيل بنجاح:', response);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>تسجيل مستخدم جديد</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>اسم المستخدم</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>كلمة المرور</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </button>
            </form>
        </div>
    );
};

export default Register;
