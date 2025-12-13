import {useEffect, useState} from "react";
import {fetchAllCategories, fetchAllTasks} from "../api/TaskApi";

export const useTaskData = () => {

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const loadInitialData = async () => {

            if (!localStorage.getItem("token")) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {

                const [tasksData, categoriesData] = await Promise.all([
                    fetchAllTasks(),
                    fetchAllCategories()
                ]);


                const processedTasks = tasksData.map(task => ({
                    ...task,
                    categoryId: task.category ? task.category.id : null,
                    subtasks: task.subtasks || [],
                    hasSubtasks: task.subtasks && task.subtasks.length > 0
                }));

                setTasks(processedTasks);
                setCategories(categoriesData);

                

            } catch (e) {

                if (e.message === '401 Unauthorized') {
                    localStorage.removeItem("token");
                } else {
                    setError(e);
                    console.error("Critical error fetching data:", e);
                }

            } finally {
                setIsLoading(false);
            }

        };
        loadInitialData();

    }, []);


    const addCategoryLocal = (newCategory) => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };


    return {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal
    };

};

