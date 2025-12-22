
import React, { useState } from "react";
import { timeDisplay } from "../../functions/TasksHelpers";
import { ReactComponent as Clock} from "../../assets/clock_icon.svg";

// import { fetchSubtasks } from "../../api/TaskApi"

const SplitTask = ({ task, isSubtask = false }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    // const [subtasks, setSubtasks] = useState(task.subtasks || []);
    const subtasks = task.subtasks || [];
    const hasChildren = subtasks.length > 0;

    const categoryColor = task.category ? task.category.color : "#828282ff";
    const categoryName = task.category ? task.category.name : 'Ogólne';

    const handleToggleSubtask = async () => {
        if(!hasChildren) return;
        // const newState = !isExpanded;
        setIsExpanded(!isExpanded);
    };

    return (

        <div 
            className={`split-task-container ${isSubtask ? 'is-subtask' : ''}`}
            style={{ '--cat-color': categoryColor }}
        >
            <div className="split-task-card">

                {!isSubtask && (
                    <div className="split-task-id-header">
                        {task.id}
                    </div>
                )}
                </div>
                <div className="split-task-content-box">

                    <div className="split-task-left">
                        <div className={`split-custom-checkbox`}>
                            <div className="dot"></div>
                        </div>

                        {hasChildren && (
                            <div 
                                className={`split-expand-arrow ${isExpanded ? 'expanded' : ''}`}
                                onClick={handleToggleSubtask}
                            >
                                ›
                            </div>
                        )}

                        <div className="split-task-info">
                            <p className={`split-task-name `}>
                                {task.name}
                            </p>
                        </div>
                    </div>

                    <div className="split-task-right">
                        {task.timeNeeded && (
                            <span className="split-task-time">
                                <span className="clock-icon"><Clock className="clock_icon"></Clock></span> {timeDisplay(task.timeNeeded)}
                            </span>
                        )}
                        
                        
                    </div>

                </div>
            

            {hasChildren && isExpanded && (
                <div className="split-subtasks-container">
                    {subtasks.map(subtask => (
                        <SplitTask 
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

export default SplitTask;