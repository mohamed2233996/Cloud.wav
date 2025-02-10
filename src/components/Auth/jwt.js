
const fetchProtectedData = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('No token found');
        return;
    }

    try {
        const response = await fetch('http://your-laravel-api-domain/protected-route', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        alert('Error fetching protected data');
    }
};
