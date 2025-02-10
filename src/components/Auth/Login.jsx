import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '../../utils/authUtils';
import { saveToLocalStorage } from '../../utils/storageUtils';
import { login } from '../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import ReactFacebookLogin from 'react-facebook-login';
import logo from "../../assets/Img/logo.png";
import map from "../../assets/Img/Hero Section.png";
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

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


    const googleClientId = "534327465349-cbgjge2f1n5b2e3r6gntsrsfqr9408m2.apps.googleusercontent.com";
    const facebookAppId = "931252289197501";

    const responseFacebook = async(response) => {
        console.log("Facebook Login Response:", response);

        if (response.accessToken) {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/facebook", {
                    accessToken: response.accessToken, // إرسال التوكن إلى السيرفر
                });

                console.log("JWT Token from Server:", res.data.token);

                localStorage.setItem("jwtToken", res.data.token);
                alert("تم تسجيل الدخول بنجاح!");
            } catch (error) {
                console.error("Error sending token to server:", error);
            }
        } else {
            console.error("Facebook login failed!");
        }

    };


    return (

        <>
            <div className='h-[100vh]'>
                <div className='flex justify-center items-center h-full'>
                    <div className='lg:w-4/7 w-full h-full bg-white pt-28 mx-auto'>
                        <div className='w-[70%] m-auto'>
                            <img src={logo} alt="logo" />
                            <h2 className='text-3xl font-bold mt-10 text-[#2F00AC]'>Hi, Welcome Back Fellas!</h2>
                            <div className='pt-8'>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col items-start pt-4'>
                                        <label className='text-sm mb-3 text-[#919499]'>{"Email or username"}</label>
                                        <input
                                            className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                            type="email"
                                            value={email}
                                            placeholder='Email or username'
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col items-start pt-4'>
                                        <div className='mb-3 text-sm flex flex-row justify-between w-full'>
                                            <label className='text-[#919499]'>{("password")}</label>
                                            <span className='text-[#2F00AC] text-bold'>
                                                <a href="">Forgot Password?</a>
                                            </span>
                                        </div>
                                        <input
                                            className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                            type="password"
                                            value={password}
                                            placeholder='Password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <p>{error}</p>}
                                    <button type="submit" className='w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]'>Sign In</button>
                                </form>
                            </div>
                            <div className='relative w-full h-[1px] bg-[#919499] mt-12'>
                                <span className='absolute top-0 left-1/2 px-10 text-[#919499] bg-white -translate-y-[50%] -translate-x-[50%]'>Or sign in with</span>
                            </div>
                            <div className='mt-12 flex flex-row items-center justify-center gap-8'>
                                {/* تسجيل الدخول عبر Google */}
                                <GoogleOAuthProvider clientId={googleClientId}>
                                    <GoogleLogin
                                        onSuccess={async (response) => {
                                            const token = response.credential

                                            try {
                                                const response = await axios.post("http://localhost:5000/auth/google", {
                                                    token,
                                                });
                                                console.log("Server Response:", response.data);
                                                if (response.data.success) {
                                                    localStorage.setItem("jwt", response.data.token);
                                                    console.log("User Logged In:", response.data.user);
                                                }
                                            } catch (error) {
                                                console.error("Login error:", error);
                                            }
                                        }}
                                        onError={() => console.log("Google Login Failed")}
                                        type='icon'
                                        text=''
                                        size='large'
                                        shape='circle'
                                        width={64}

                                    />
                                </GoogleOAuthProvider>
                                <ReactFacebookLogin
                                    appId={facebookAppId}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    textButton=''
                                    icon="fa-facebook"
                                    cssClass='w-16 h-16 text-4xl bg-[#4267b2] text-white rounded-full cursor-pointer '
                                />
                            </div>
                            <p className='text-center mt-10 text-[#919499]'>
                                Don't have an account? <a href="/register" className='text-[#2F00AC]'>Sign up</a>
                            </p>
                        </div>
                    </div>


                    <div className='flex justify-center lg:w-3/7 w-0 h-full pt-28 bg-black relative overflow-hidden'>
                        <div className='w-[80%] mx-auto'>
                            <h1 className='text-5xl text-white font-black mb-16'>Unleash Your sound <span className='text-[#2AC3FC]'>world</span> is tuned in</h1>
                            <p className='text-white'>Try it and see the difference</p>
                            <img src={Hero} alt="Hero" className='absolute bottom-0 right-0 max-w-[1100px] lg:w-[900px] xl:w-[1100px]' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;


