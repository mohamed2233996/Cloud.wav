import React, { useState } from 'react';
import { registerUser } from '../../utils/apiUtils';
import { isValidEmail, isValidPassword, isValidUsername } from '../../utils/authUtils';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import ReactFacebookLogin from 'react-facebook-login';
import logo from "../../assets/Img/logo.png";
import map from "../../assets/Img/g42.png";
import groupM from "../../assets/Img/Group 43.png";
import axios from 'axios';


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
        <div className='h-[100vh]'>
            <div className='flex justify-center items-center h-full'>
                <div className='lg:w-4/7 w-full h-full bg-white pt-28 mx-auto'>
                    <div className='w-[70%] m-auto'>
                        <h2 className='text-3xl font-bold mt-10 text-[#2F00AC]'>Get Started</h2>
                        <div className='pt-8'>
                            <form onSubmit={handleSubmit}>
                            <div className='flex flex-col items-start pt-4'>
                                <label className='text-sm mb-3 text-[#919499]'>Full Name <span className='text-red-800'>*</span></label>
                                    <input
                                    className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                        type="text"
                                        value={username}
                                        placeholder='Username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col items-start pt-4'>
                                    <label className='text-sm mb-3 text-[#919499]'>{"Email Adress"}<span className='text-red-800'>*</span></label>
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
                                        <label className=' text-sm mb-3 text-[#919499]'>{("password")}<span className='text-red-800'>*</span></label>
                                    <input
                                        className='text-[#919499] border border-[#C4C4C4] focus:outline focus:outline-[#2F00AC] rounded-[14px] w-full p-4'
                                        type="password"
                                        value={password}
                                        placeholder='Password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='flex flex-col items-start pt-4'>
                                        <label className=' text-sm mb-3 text-[#919499]'>{("Confirm Password")}<span className='text-red-800'>*</span></label>
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
                                <button type="submit" className='w-full mt-10 font-bold bg-[#2F00AC] text-white rounded-[14px] transition-all py-4 border border-[#2F00AC] hover:bg-white hover:text-[#2F00AC]'>Sign Up</button>
                            </form>
                        </div>
                        <h3 className='text-[#2F00AC] text-3xl text-center mt-10 font-bold'>OR</h3>
                        <div className='mt-12 flex flex-row items-center justify-center gap-8'>
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

                    </div>
                </div>

                <div className='flex justify-center lg:w-3/7 w-0 h-full pt-28 bg-[#E6F6FF] relative overflow-hidden'>
                    <div className='w-[80%] mx-auto'>
                        <h1 className='text-5xl text-[#2AC3FC] font-black mb-10'><span className='text-[#2F00AC]'>Our Members</span> are Arround the World</h1>
                        <p className='text-black'>Over 5,000 Singer join us monthly</p>
                        <img className='mt-10' src={groupM} alt="mempars" />
                        <img src={map} alt="Hero" className='absolute bottom-[200px] right-0 left-0' />
                        <img src={logo} alt="Hero" className='absolute bottom-[50px] right-0' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
