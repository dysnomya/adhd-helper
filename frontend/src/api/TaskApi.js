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

        const categoryIds = filters.categories
            .map(id => {
                if (id === null || id === 'NULL_CATEGORY') return '\0';
                return id;
            })
            .filter(id => id !== undefined && id !== false);

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

export const getTaskStats = async (date) => {
    const url = `${TASKS_URL}/stats?day=${date}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
    });

    // 200
    if (response.ok) {
        return await response.json();
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się pobrać statystyk dla taska.");
    } catch (e) {
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};

// POST
export const createCategory = async (categoryData) => {

    const response = await fetch(CATEGORIES_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(categoryData)
    });

    // 200
    if (response.ok) {
        return await response.json();
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się utworzyć kategorii.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }

};


export const createTask = async (taskData) => {

    const response = await fetch(TASKS_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(taskData)
    });

    // 200
    if (response.ok) {
        return await response.json();
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się utworzyć taska.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }

};


// DELETE
export const deleteTask = async (id) => {

    const response = await fetch(`${TASKS_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    // 200
    if (response.ok) {
        return true; 
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Wystąpił nieznany błąd podczas usuwania taska.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status} ${response.statusText}`);
    }
};


export const deleteCategory = async (id) => {

    const response = await fetch(`${CATEGORIES_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    // 200
    if (response.ok) {
        return true; 
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się usunąć kategorii.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};

// PUT
export const updateCategory = async (id, categoryData) => {

    const response = await fetch(`${CATEGORIES_URL}/categories/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(categoryData)
    });

    // 200
    if (response.ok) {
        return await response.json();
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się zedytować kategorii.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }

};


export const updateTask = async (id, taskData) => {

    const response = await fetch(`${TASKS_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(taskData)
    });

    // 200
    if (response.ok) {
        return await response.json();
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nieudało się zaktualizować taska.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};

// PATCH

export const completeTask = async (id) => {

    const response = await fetch(`${TASKS_URL}/${id}/complete`, {
        method: 'PATCH',
        headers: getHeaders()
    });

    // 200
    if (response.ok) {
        return true;
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nieudało się zaznaczyć taska.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};

export const uncompleteTask = async (id) => {

    const response = await fetch(`${TASKS_URL}/${id}/uncomplete`, {
        method: 'PATCH',
        headers: getHeaders()
    });

    // 200
    if (response.ok) {
        return true;
    }

    // 400, 404, 500
    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nieudało się odznaczyć taska.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};