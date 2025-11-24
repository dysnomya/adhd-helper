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

export const fetchSubtasks = async (parentId) => {
    const response = await fetch(`/api/tasks/${parentId}/subtasks`, {
        headers: getHeaders(),
    });
    if (response.status === 204) {
        return [];
    }
    if (!response.ok) {
        throw new Error('Błąd pobierania podzadań');
    }
    return response.json();
};