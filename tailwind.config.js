/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // تأكد أن المسارات صحيحة
    theme: {
        extend: {
            colors: {
                primary: "#1D4ED8", // أزرق
                secondary: "#9333EA", // بنفسجي
                accent: "#F59E0B", // برتقالي
                dark: "#111827", // رمادي غامق
                light: "#F3F4F6", // رمادي فاتح
            },
        },
    },
    plugins: [],
};
