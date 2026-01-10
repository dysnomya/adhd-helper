import {useEffect, useState, useCallback} from "react";
import {fetchAllCategories, fetchAllTasks} from "../api/TaskApi";

export const useTaskData = (activeFilter, selectedDate, showAllTasks) => {

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const loadData = useCallback(async () => {

        if (!localStorage.getItem("token")) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const apiFilters = {};

            if (!showAllTasks && selectedDate) {
                apiFilters.day = selectedDate;
            }

            if (activeFilter && activeFilter.length > 0) {
                apiFilters.categories = activeFilter;
            }

            const [tasksData, categoriesData] = await Promise.all([
                fetchAllTasks(apiFilters),
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
                console.error("Błąd pobierania danych:", e);
                setError(e);
            }

        } finally {
            setIsLoading(false);
        }

    }, [activeFilter, selectedDate, showAllTasks]);

    useEffect(() => {
        loadData();
    }, [loadData]);


    const addCategoryLocal = (newCategory) => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const toggleTaskLocal = (taskId, isCompleted) => {

        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                return { 
                    ...task, 
                    completed: isCompleted
                };
            }

            if (task.subtasks && task.subtasks.length > 0) {

                const subtaskIndex = task.subtasks.findIndex(sub => sub.id === taskId);

                if (subtaskIndex !== -1) {

                    const newSubtasks = [...task.subtasks];

                    newSubtasks[subtaskIndex] = {
                        ...newSubtasks[subtaskIndex],
                        completed: isCompleted
                    };

                    return {
                        ...task,
                        subtasks: newSubtasks
                    };
                }
            }

            return task;
        }));
    };


    const deleteTaskLocal = (taskId) => {
        setTasks(prevTasks => {
            const filteredTasks = prevTasks.filter(task => task.id !== taskId);

            if(filteredTasks.length !== prevTasks.length) {
                return filteredTasks;
            }

            return prevTasks.map(task => {
                if (task.subtasks && task.subtasks.length > 0) {
                    return {
                        ...task,
                        subtasks: task.subtasks.filter(subtask => subtask.id !== taskId)
                    };
                }
                return task;
            });
        });
    };


    const updateTaskLocal = (taskId, updatedData) => {
        setTasks(prevTasks => prevTasks.map(task => {

            // task
            if (task.id === taskId) {
                return {
                    ...task,
                    ...updatedData
                };
            }

            // subtask
            if (task.subtasks) {
                const subtaskIndex = task.subtasks.findIndex(subtask => subtask.id === taskId);

                if (subtaskIndex !== -1) {
                    const newSubtasks = [...task.subtasks];
                    newSubtasks[subtaskIndex] = { ...newSubtasks[subtaskIndex], ...updatedData };
                    return { ...task, subtasks: newSubtasks };
                }
            }

            return task;
        }));
    };

    const addTaskLocal = (newTask) => {
        setTasks(prevTasks => {
            if (newTask.parentId) {
                return prevTasks.map(task => {
                    if (task.id === newTask.parentId) {
                        return {
                            ...task,
                            subtasks: [...(task.subtasks || []), newTask]
                        };
                    }

                    return task;
                });
            }

            return [...prevTasks, newTask];
        });
    };


    const updateCategoryLocal = (categoryId, updatedData) => {

        // console.log(`category id: ${categoryId}`)
        // console.log(`updatedData: ${updatedData}`)

        setCategories(prevCategories => prevCategories.map(cat =>
            cat.id === categoryId
                ? { ...cat, ...updatedData }
                : cat
        ));

        setTasks(prevTasks => prevTasks.map(task => {
            let hasChanged = false;
            let newTask = { ...task };

            // console.log("set tasks update category")

            // console.log("task")
            // console.log(newTask)

            // console.log(`task category: ${newTask.category}`)
            // if (newTask.category) {
            //     console.log(`task category id: ${newTask.category.id}`)
            // }
            

            if (newTask.category && newTask.category.id === categoryId) {
                // console.log("if się robi")
                newTask.category = {
                    ...newTask.category,
                    ...updatedData
                };
                hasChanged = true;
            }

            if (newTask.subtasks && newTask.subtasks.length > 0) {
                const updatedSubtasks = newTask.subtasks.map(subtask => {
                    if (subtask.category && subtask.category.id === categoryId) {
                        hasChanged = true;
                        return {
                            ...subtask,
                            category: {
                                ...subtask.category,
                                ...updatedData
                            }
                        };
                    }
                    return subtask;
                });

                if (hasChanged) {
                    newTask.subtasks = updatedSubtasks;
                }
            }

            return hasChanged ? newTask : task;
        }));
    }

    const deleteCategoryLocal = (categoryId) => {
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));

        setTasks(prevTasks => prevTasks.map(task => {
            if (task.category && task.category.id === categoryId) {
                return {
                    ...task,
                    category: null
                };
            }
            return task;
        }));
    }


    return {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal,
        toggleTaskLocal,
        deleteTaskLocal,
        updateCategoryLocal,
        deleteCategoryLocal,
        updateTaskLocal,
        addTaskLocal
    };

};

