const GET_URL = "/api/profile";
const FEED_URL = "/api/profile/feed"; // + amount

const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const fetchProfileInfo = async () => {
    const response = await fetch(GET_URL, {
        headers: getHeaders(),
    });

    if (response.status === 401) throw new Error('401 Unauthorized');
    if (!response.ok) throw new Error('Błąd pobierania danych profilu.');
    return response.json();
};

export const feedPimpus = async (amount) => {
    const url = `${FEED_URL}/${amount.toString()}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders()
    });

    if (response.status === 401) throw new Error('401 Unauthorized');
    if (!response.ok) throw new Error('Błąd karmienia Pimpusia.');
    return response.json();
};