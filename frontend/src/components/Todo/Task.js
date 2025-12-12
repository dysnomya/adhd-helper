
import React, { useState } from "react";
import { timeDisplay } from "../../functions/TasksHelpers";
import { ReactComponent as Clock} from "../../assets/clock_icon.svg";

const Task = ({ task, isSubtask = false }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const subtasks = task.subtasks || [];
    const hasChildren = subtasks.length > 0;

    const categoryColor = task.category ? task.category.color : "#828282ff" ;
    const categoryName = task.category ? task.category.name : 'Ogólne';

    const handleToggleSubtask = async () => {
        if(!hasChildren) return;
        setIsExpanded(!isExpanded);
    };

    return (

        <div 
            className={`task-container ${isSubtask ? 'is-subtask' : ''}`}
            style={{ '--cat-color': categoryColor }}
        >

            <div className="task-card">

                {!isSubtask && (
                    <div className="task-category-header">
                        {categoryName}
                    </div>
                )}
                </div>

                <div className="task-content-box">

                    <div className="task-left">
                        <div className={`custom-checkbox ${task.completed ? 'checked' : ''}`}>
                            {task.completed && <div className="dot"></div>}
                        </div>

                        {hasChildren && (
                            <div 
                                className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
                                onClick={handleToggleSubtask}
                            >
                                ›
                            </div>
                        )}

                        <div className="task-info">
                            <p className={`task-name ${task.completed ? 'completed-text' : ''}`}>
                                {task.name}
                            </p>
                        </div>
                    </div>

                    <div className="task-right">
                        {task.timeNeeded && (
                            <span className="task-time">
                                <span className="clock-icon"><Clock className="clock_icon"></Clock></span> {timeDisplay(task.timeNeeded)}
                            </span>
                        )}
                                            
                    </div>
                </div>
            

            {hasChildren && isExpanded && (
                <div className="subtasks-container">
                    {subtasks.map(subtask => (
                        <Task 
                            key={subtask.id} 
                            task={{ ...subtask, parentId: task.id }} 
                            isSubtask={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Task;