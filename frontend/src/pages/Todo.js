
import { useState, useEffect } from "react";
import { useTaskData } from "../modules/tasks/hooks/UseTaskData";
import TodoSidebar from "../modules/tasks/components/TodoSidebar";
import TaskListContainer from "../modules/tasks/components/layout/TaskListContainer";

import { useMemo } from 'react';
import { getTaskDateName, parseEuropeanDate } from "../modules/tasks/TasksHelpers"

const Todo = () => {

    // Loading tasks data from database
    const {
        tasks,
        categories,
        isLoading,
        error
    } = useTaskData();

    // Debugging - Do usunięcia później
    useEffect(() => {
        if (tasks.length > 0) {
            console.log("Zadania:", tasks);
            
            console.log("Kategorie:", categories)
        }
    }, [tasks, categories]);
    // --------

    const [activeFilter, setActiveFilter] = useState([]);

    // Filtering tasks by chosen categories
    const filteredTasks = useMemo(() => {
        // No chosen categories --> all tasks
        if (activeFilter.length === 0) {
            return tasks;
        }

        // "Checked" categories --> tasks that are in categories set in activeFilter
        return tasks.filter(task => {
            if (task.categoryId === null) {
                return activeFilter.includes('NULL_CATEGORY');
            }
        
            return activeFilter.includes(task.categoryId)
        });

    }, [tasks, activeFilter]);

    // Categorizing tasks by their dates
    const prepareDatedTasks = (filteredTasks) => {

        const dated = filteredTasks.reduce((acc, task) => {

            const dateName = getTaskDateName(task.day);

            if (!acc[dateName]) {
                acc[dateName] = [];
            }

            acc[dateName].push(task);

            return acc;
        }, {});


        const order = ["Dzisiaj", "Jutro"];

        const remainingDates = Object.keys(dated)
        .filter(name => !order.includes(name) && name !== "Bez daty")
        .sort((a, b) => {
            const dateA = parseEuropeanDate(a);
            const dateB = parseEuropeanDate(b);

            return dateA.getTime() - dateB.getTime();
        });

        order.push(...remainingDates, "Bez daty");

        const finalDatedList = [];

        order.forEach(dateName => {
            if (dated[dateName]) {
                finalDatedList.push({
                    title: dateName,
                    tasks: dated[dateName].sort((a, b) => {
                        return a.id - b.id;
                    })
                });
            }
        });


        return finalDatedList;

    }


    const datedTasks = useMemo(() => {
        return prepareDatedTasks(filteredTasks);
    }, [filteredTasks]);


    if (isLoading) return <div>Ładowanie danych ToDo...</div>;
    if (error) return <div>Błąd ładowania danych: {error.message}</div>;



    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>

            <TodoSidebar
                categories={categories}
                setActiveFilter={setActiveFilter}
                activeFilter={activeFilter}
            />

            <div className="todo-main-content-area">

                <h1 style={{margin: "20px"}}>Zadania</h1>

                <TaskListContainer datedTasks={datedTasks}></TaskListContainer>

            </div>

        </div>
    );

};

export default Todo;