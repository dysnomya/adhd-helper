const TASKS_URL = "/api/tasks"
const CATEGORIES_URL = "/api/categories"

const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

// GET
export const fetchAllTasks = async (filters ={}) => {

    const params = new URLSearchParams();

    if (filters.day) {
        params.append('day', filters.day);
    }

    if (filters.categories && filters.categories.length > 0) {

        // ominięcie NULL_CATEGORY na razie
        const categoryIds = filters.categories.filter(id => typeof id === 'number');

        if (categoryIds.length > 0) {
            params.append('category', categoryIds.join(','));
        }

    }

    const url = `${TASKS_URL}?${params.toString()}`;

    const response = await fetch(url, {
        headers: getHeaders(),
    });

    if (response.status === 401) throw new Error('401 Unauthorized');
    if (!response.ok) throw new Error('Błąd pobierania zadań.');
    return response.json();

};

export const fetchAllCategories = async () => {

    const response = await fetch(CATEGORIES_URL, {
        headers: getHeaders(),
    });

    if (response.status === 401) throw new Error('401 Unauthorized');
    if (!response.ok) throw new Error('Błąd pobierania kategorii.');
    return response.json();

};

// POST
export const createCategory = async (categoryData) => {

    const response = await fetch(CATEGORIES_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(categoryData)
    });

    if (response.status === 401) throw new Error('401 Unauthorized');
    if (!response.ok) throw new Error('Błąd tworzenia kategorii.');

    return response.json();

};

export const fetchTaskDataForTimePeriod = async (dayFrom, dayTo) => {

    const filters = {
        "dayFrom": new Intl.DateTimeFormat('en-CA').format(dayFrom),
        "dayTo": new Intl.DateTimeFormat('en-CA').format(dayTo)
    };

    const params = new URLSearchParams(filters);

    const taskRes = await fetch(`${TASKS_URL}?${params}`, {
        headers: getHeaders()
    });

    return await taskRes.json();
};