import React, { useState, useEffect } from "react";
import { getTaskStats } from "../../api/TaskApi";

const DailyProgress = ({ date, refreshTrigger }) => {

    const [stats, setStats] = useState({ completed: 0, total: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            if (!date) return;

            try {
                const data = await getTaskStats(date);
                setStats({
                    completed: data.completed,
                    total: data.total
                });
            } catch (error) {
                console.error("Błąd pobierania statystyk:", error);
            } 
        };

        fetchStats();

    }, [date, refreshTrigger]);

    const percentage = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

    return (
        <div className="todo-daily-progress-container">
            
                
            {stats.total === 0 ? (
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

