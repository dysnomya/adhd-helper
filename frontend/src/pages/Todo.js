import "../styles/todo.scss";
import { useState, useEffect, useMemo } from "react";
import { useTaskData } from "../hooks/UseTaskData";
import TodoSidebar from "../components/Todo/TodoSidebar";
import TaskListContainer from "../components/Todo/TaskListContainer";
import { getTaskDateName, parseEuropeanDate } from "../functions/TasksHelpers"
import AddCategoryModal from "../components/Todo/AddCategoryModal";
import { createCategory } from "../api/TaskApi";
import { ReactComponent as Dynks} from "../assets/dynks.svg";
import { ReactComponent as Filter} from "../assets/Filter_icon.svg";


const Todo = () => {

    const [activeFilter, setActiveFilter] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const [showAllTasks, setShowAllTasks] = useState(true);

    // Loading tasks data from database
    const {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal,
        toggleTaskLocal
    } = useTaskData(activeFilter, selectedDateFilter, showAllTasks);

    // Debugging - Do usunięcia później
    useEffect(() => {
        if (tasks.length > 0) {
            console.log("Zadania:", tasks);
            
            console.log("Kategorie:", categories)
        }
    }, [tasks, categories]);
    // --------


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

    const prepareDatedTasks = (tasksToGroup) => {

        const dated = tasksToGroup.reduce((acc, task) => {
            const dateName = getTaskDateName(task.day);
            if (!acc[dateName]) {
                acc[dateName] = [];
            }
            acc[dateName].push(task);
            return acc;
        }, {});


        const allDateKeys = Object.keys(dated);

        const getTimestamp = (dateName) => {
            if (dateName === "Bez daty") return Infinity;
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dateName === "Dzisiaj") return today.getTime();
            if (dateName === "Jutro") return today.getTime() + (24 * 60 * 60 * 1000);

            const parsed = parseEuropeanDate(dateName);
            return parsed.getTime();
        };

        const sortedKeys = allDateKeys.sort((a, b) => {
            return getTimestamp(a) - getTimestamp(b);
        });

        const finalDatedList = [];

        sortedKeys.forEach(dateName => {
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
        return prepareDatedTasks(tasks);
    }, [tasks]);


    if (error) return <div>Błąd ładowania danych: {error.message}</div>;

    return (
        <div className="todo-main">
            <div className="mobile-header">
                <Dynks></Dynks>
                <button 
                    className="menu-toggle-btn" 
                    onClick={() => setIsSidebarOpen(true)}>
                    <Filter></Filter>
                </button>
            </div>

            <div className={`todo-sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
                
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
                
                <div className="todo-sidebar-main">
                    <TodoSidebar
                        categories={categories}

                        setActiveFilter={setActiveFilter}
                        activeFilter={activeFilter}

                        onAddCategoryClick={() => setIsModalOpen(true)}

                        selectedDate={selectedDateFilter}
                        onDateChange={setSelectedDateFilter}

                        showAllTasks={showAllTasks}
                        onToggleShowAll={setShowAllTasks}
                    />

                </div>
            </div>

            

            <div className="todo-main-content-area">

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}

                <div className="todo-tasks-list">
                    <TaskListContainer 
                        datedTasks={datedTasks} 
                        onTaskStatusChange={toggleTaskLocal}
                    ></TaskListContainer>
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