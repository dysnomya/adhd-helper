import React from "react";



const DailyProgress = ({ tasks }) => {

    const getTodayString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = getTodayString();

    const todayTasks = tasks.filter(task => task.day === today);
    const totalTodayTasks = todayTasks.length;

    const completedTodayTasks = todayTasks.filter(task => task.completed).length;

    const percentage = totalTodayTasks === 0 ? 0 : Math.round((completedTodayTasks / totalTodayTasks) * 100);

    return (
        <div className="todo-daily-progress-container">
            
                
            {totalTodayTasks === 0 ? (
                <div className="todo-progress-no-tasks-message">
                    <p>Brak zadań zaplanowanych na dzisiaj! </p>
                </div>
            ) : (
                <>
                    <p className="todo-progress-title">Dzisiejsze zadania</p>
                    
                    <div className="todo-progress-track">
                        <div 
                            className="todo-progress-fill" 
                            style={{ width: `${percentage}%` }}
                        >
                        </div>
                    </div>
                
                </>
            )}


        </div>
    );


};

export default DailyProgress;

