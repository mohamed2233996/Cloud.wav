
import React, { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../../utils/storageUtils';
import { fetchUserData } from '../../utils/apiUtils';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getFromLocalStorage('authToken');
        if (token) {
            const fetchData = async () => {
                try {
                    const data = await fetchUserData(token);
                    setUserData(data);
                } catch (error) {
                    console.error('فشل في جلب البيانات');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setLoading(false);
            window.location.href = '/login';
        }
    }, []);

    if (loading) return <p>جاري تحميل البيانات...</p>;

    if (!userData) return <p>لا توجد بيانات لعرضها.</p>;

    return (
        <div>
            <h2>مرحبًا، {userData.name}</h2>
            <p>البريد الإلكتروني: {userData.email}</p>
            <p>آخر تسجيل دخول: {userData.lastLogin}</p>
        </div>
    );
};

export default Dashboard;
