import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '../../utils/authUtils';
import { saveToLocalStorage } from '../../utils/storageUtils';
import { login } from '../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError('البريد الإلكتروني غير صالح');
            return;
        }

        if (!isValidPassword(password)) {
            setError('كلمة المرور ضعيفة');
            return;
        }

        try {
            const response = await login(email, password);

            saveToLocalStorage('authToken', response.token);

            alert('تم تسجيل الدخول بنجاح!');
            navigate('/dashboard');
        } catch (err) {
            setError('فشل في تسجيل الدخول. تأكد من بياناتك.');
        }
    };

    return (
        <div>
            <h2>تسجيل الدخول</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">تسجيل الدخول</button>
            </form>
        </div>
    );
};

export default Login;
