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
export const fetchAllTasks = async () => {

    const response = await fetch(TASKS_URL, {
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

export const loadTaskDataForDate = async (date) => {

    const filters = {
        "day": new Intl.DateTimeFormat('en-CA').format(date)
    };

    const params = new URLSearchParams(filters);

    const catRes = await fetch(CATEGORIES_URL, {
        headers: getHeaders()
    });
    const categoriesData = await catRes.json();

    const taskRes = await fetch(`${TASKS_URL}?${params}`, {
        headers: getHeaders()
    });
    const tasksData = await taskRes.json();

    return new {
        categoriesData,
        tasksData
    }
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