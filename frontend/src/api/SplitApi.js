const TASKS_URL = "/api/tasks"

const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const createSubTask = async (taskData) => {

    const url = `${TASKS_URL}/${taskData.parentId}/subtasks`;

    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(taskData)
    });

    if (response.ok) {
        return await response.json();
    }

    try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nie udało się utworzyć podzadania.");
    } catch (parsingError) {
        if (parsingError.message && parsingError.message !== "Unexpected end of JSON input") {
             throw parsingError; 
        }
        throw new Error(`Błąd serwera: ${response.status}`);
    }
};