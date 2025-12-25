import "../styles/todo.scss";
import { useState, useMemo, useEffect } from "react";
import { useTaskData } from "../hooks/UseTaskData";
import TodoSidebar from "../components/Todo/TodoSidebar";
import TaskListContainer from "../components/Todo/TaskListContainer";
import { getTaskDateName, parseEuropeanDate } from "../functions/TasksHelpers"
import AddCategoryModal from "../components/Todo/AddCategoryModal";
import { createCategory } from "../api/TaskApi";
import { ReactComponent as Dynks} from "../assets/dynks.svg";
import { ReactComponent as Filter} from "../assets/Filter_icon.svg";
import { useLocation } from "react-router-dom";
import { ReactComponent as SadPimpus } from "../assets/pimpus_sad.svg";
import DailyProgress from "../components/Todo/DailyProgress";

import pimpus from "../assets/pimpus_happy_anim.webp";

//  todo?date=2025-12-06
const Todo = () => {
    const location = useLocation();     // hook do pobrania adresu URL

    const initialFilters = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const dateParam = searchParams.get('date');
        
        return {
            date: dateParam || '',
            showAll: !dateParam
        };
    }, [location.search]);

    const [activeFilter, setActiveFilter] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [selectedDateFilter, setSelectedDateFilter] = useState(initialFilters.date);
    const [showAllTasks, setShowAllTasks] = useState(initialFilters.showAll);

    const [areCategoriesInitialized, setAreCategoriesInitialized] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const dateParam = searchParams.get('date');

        if (dateParam) {
            setSelectedDateFilter(prev => (prev !== dateParam ? dateParam : prev));
            setShowAllTasks(false);
        } else if (initialFilters.showAll) {
            setShowAllTasks(prev => (!prev ? true : prev));
        }
    }, [location.search, initialFilters]);

    // Loading tasks data from database
    const {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal,
        toggleTaskLocal,
        deleteTaskLocal,
        updateTaskLocal
    } = useTaskData(activeFilter, selectedDateFilter, showAllTasks);


    useEffect(() => {     
        if (categories.length > 0 && !areCategoriesInitialized) {

            const allCategoryIds = categories.map(cat => cat.id);
            allCategoryIds.push("NULL_CATEGORY");

            setActiveFilter(allCategoryIds);
            setAreCategoriesInitialized(true);
        }
        
    }, [categories, areCategoriesInitialized]);

    const handleConfirmAddCategory = async (name, color) => {

        try {
            // API
            const newCategoryFromBackend = await createCategory({ name, color });
            addCategoryLocal(newCategoryFromBackend);

            //TEMP
            alert("Dodano grupę");

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


    const isFirstLoad = isLoading && tasks.length === 0 && categories.length === 0;


    const handleDeleteTask = async (taskId) => {
        try {
            // API CALL
            deleteTaskLocal(taskId);
        } catch (e) {
            console.error("Błąd usuwania zadania", e);
            alert("Nie udało się usunąć zadania.");
        }
    };

    const handleUpdateTask = async (taskId, updatedData) => {
        try {
            // API CALL
            updateTaskLocal(taskId, updatedData);
        } catch (e) {
            console.error("Błąd edycji zadania", e);
            alert("Nie udało się zedytować zadania.");
        }
    };

    // Debugging - Do usunięcia później
    useEffect(() => {
        if (tasks.length > 0) {
            console.log("Zadania:", tasks);
            
            console.log("Kategorie:", categories)
        }
    }, [tasks, categories]);
    // --------


    if (error) return (
        <div className="server-data-error-main">
            <div className="server-data-error">
                <SadPimpus className="sad-pimpus"></SadPimpus>
                <p className="blad-serwera">Błąd połączenia z serwerem</p>
                <p>Coś poszło nie tak. Sprawdź połączenie z internetem.</p>
            </div>
        </div>
    );

    return (
        <div className="todo-main">

            {isLoading && (
                <div className={`loading-overlay ${isFirstLoad ? 'initial-load' : ''}`}>
                    <div className="spinner"></div>
                </div>
            )}

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

                <div className="todo-daily-wrapper">
                    <DailyProgress 
                    />
                    <div className="add-task-btn-container">
                        <button className="add-task-btn">
                        + Nowe zadanie
                    </button>
                    </div>
                    <div className="todo-progress-pimpus-wrapper">
                        <img 
                            src={pimpus} 
                            alt="Happy Pimpus" 
                            className="todo-progress-pimpus"
                        />
                    </div>
                </div>

                <div className="todo-tasks-list">

                    {tasks.length === 0 && categories.length === 0 && (
                        <div className="no-data-yet">
                            <p>Nie stworzyłeś jeszcze tasków, zrób je dla Pimpusia!</p>
                        </div>
                    )}


                    <TaskListContainer 
                        datedTasks={datedTasks} 
                        onTaskStatusChange={toggleTaskLocal}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                        categories={categories}
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