import React from "react";


const DailyProgress = () => {

    const completedTasks = 2;
    const totalTasks = 3;

    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="todo-daily-progress-container">
            
                
            {totalTasks === 0 ? (
                <div className="todo-progress-no-tasks-message">
                    <p>Brak zaplanowanych zadań! </p>
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

