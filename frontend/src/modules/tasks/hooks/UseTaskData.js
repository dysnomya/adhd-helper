import { useState, useEffect } from "react";
import { fetchAllTasks, fetchAllCategories } from "../api/TaskApi";

export const useTaskData = () => {

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {

        const loadInitialData = async () => {

            if (!localStorage.getItem("token")) {
                setIsLoading(false);
                setIsAuthenticated(false);
                return;
            }

            setIsLoading(true);

            try {

                const [tasksData, categoriesData] = await Promise.all([
                    fetchAllTasks(),
                    fetchAllCategories()
                ]);


                const processedTasks = tasksData.map(dto => ({
                    ...dto,
                }));

                setTasks(processedTasks);
                setCategories(categoriesData);
                setIsAuthenticated(true);

            } catch (e) {

                if (e.message === '401 Unauthorized') {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                } else {
                    setError(e);
                }

            } finally {
                setIsLoading(false);
            }

        };
        loadInitialData();

    }, []);


    return {
        tasks,
        categories,
        isLoading,
        error,
        isAuthenticated
    };

};

