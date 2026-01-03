import React, { useMemo } from 'react';
import "../../styles/dashboard.scss";

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'HIGH': return '#D22727';
        case 'MEDIUM': return '#E9BD2B';
        case 'LOW': return '#A5DD3C';
        default: return 'transparent';
    }
};

const UpcomingTasks = ({ tasks }) => {

    const nextThreeTasks = useMemo(() => {
        if (!tasks) return [];

        return tasks
            .filter(task => !task.completed)
            .sort((a, b) => {
                if (!a.day) return 1;
                if (!b.day) return -1;
                return new Date(a.day) - new Date(b.day);
            })
            .slice(0, 3);
    }, [tasks])


    if (nextThreeTasks.length === 0) {
        return (
            <div></div>
            // <div className="dashboard-upcoming-container empty">
            //     <p>Brak nadchodzących zadań. Wszystko zrobione!</p>
            // </div>
        );
    }


    return (
        <div className="upcoming-container">
            
            <div className="upcoming-list">
                {nextThreeTasks.map(task => {
                    const catColor = task.category ? task.category.color : '#828282';
                    const catName = task.category ? task.category.name : 'Ogólne';

                    const priorityColor = getPriorityColor(task.priority);
                    const finalPriorityColor = task.priority ? priorityColor : 'var(--cat-color)';

                    return (
                        <div 
                            key={task.id} 
                            className="upcoming-card"
                            style={{ '--cat-color': catColor, '--prio-color': finalPriorityColor }}
                        >
                            <div className="upcoming-header">
                                {catName}
                            </div>

                            <div className="upcoming-body">
                                <div className="upcoming-circle"></div>
                                <p className="upcoming-name">{task.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default UpcomingTasks;
