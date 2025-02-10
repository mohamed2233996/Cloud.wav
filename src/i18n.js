
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            welcome: "Welcome to our site!",
            login: "Login",
            username: "Username",
            password: "Password",
            submit: "Submit"
        }
    },
    ar: {
        translation: {
            welcome: "أهلاً بك في موقعنا!",
            login: "تسجيل الدخول",
            username: "اسم المستخدم",
            password: "كلمة المرور",
            submit: "إرسال"
        }
    }
};

i18n
    .use(LanguageDetector) 
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en", // اللغة الاحتياطية
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
