import "../styles/todo.scss";
import { useState, useEffect, useMemo } from "react";
import { useTaskData } from "../hooks/UseTaskData";
import TodoSidebar from "../components/Todo/TodoSidebar";
import TaskListContainer from "../components/Todo/TaskListContainer";
import { getTaskDateName, parseEuropeanDate } from "../functions/TasksHelpers"
import AddCategoryModal from "../components/Todo/AddCategoryModal";
import { createCategory } from "../api/TaskApi";

const Todo = () => {

    // Loading tasks data from database
    const {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmAddCategory = async (name, color) => {

        try {
            // API
            const newCategoryFromBackend = await createCategory({ name, color });
            addCategoryLocal(newCategoryFromBackend);

            //TEMP
            alert("DOdano grupę");

        } catch (e) {
            console.error(e);
        }

        setIsModalOpen(false);
    }

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

    // const handleConfirmAddCategory = async (name, color) => {

    // }

    return (
        <div className="todo-main">

            <TodoSidebar
                categories={categories}
                setActiveFilter={setActiveFilter}
                activeFilter={activeFilter}
                onAddCategoryClick={() => setIsModalOpen(true)}
            />

            <div className="todo-main-content-area">

                <div className="todo-tasks-list">
                    <TaskListContainer datedTasks={datedTasks}></TaskListContainer>
                </div>
                

            </div>

            <AddCategoryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAddCategory}
            />

        </div>
    );

};

export default Todo;