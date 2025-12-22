
import React, { useState, useEffect, useRef } from "react";
import { timeDisplay } from "../../functions/TasksHelpers";
import { ReactComponent as Clock} from "../../assets/clock_icon.svg";

import { ReactComponent as CheckIcon } from "../../assets/check_icon.svg";
import { ReactComponent as TriangleArrowIcon } from "../../assets/triangle-arrow-button.svg";

import { ReactComponent as EditIcon } from "../../assets/edit-button.svg";
import { ReactComponent as SplitIcon } from "../../assets/split-button.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-button.svg";

const Task = ({ task, isSubtask = false, onStatusChange }) => {

    const [isCompleted, setIsCompleted] = useState(task.completed);   // checkbox
    const [isExpanded, setIsExpanded] = useState(false);    // subtasks
    const [isExpandedOptions, setIsExpandedOptions] = useState(false);

    const subtasks = task.subtasks || [];
    const hasChildren = subtasks.length > 0;
    const debounceTimer = useRef(null);

    const categoryColor = task.category ? task.category.color : "#828282ff" ;
    const categoryName = task.category ? task.category.name : 'Ogólne';


    useEffect(() => {
        setIsCompleted(task.completed);
    }, [task.completed]);

    const handleCheckedTask = () => {
        const newStatus = !isCompleted;
        
        setIsCompleted(newStatus);

        if (onStatusChange) {
            onStatusChange(task.id, newStatus);
        }

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            try {
            
                // API CALL

                console.log(`${task.id}: ${newStatus}`);
            } catch (e) {
                console.error("Błąd zapisu checkboxa", e);
                setIsCompleted(!newStatus);
            }
        }, 500); 
    };

    const handleToggleSubtask = async () => {
        if(!hasChildren) return;
        setIsExpanded(!isExpanded);
    };

    const handleExpandOptions = () => {
        setIsExpandedOptions(!isExpandedOptions);
    };


    const handleOptionClickEdit = () => {
        console.log("Editing")
    }

    const handleOptionClickSplit = () => {
        console.log("Splitting")
    }

    const handleOptionClickDelete = () => {
        console.log("Deleting")
    }
    
    return (

        <div 
            className={`task-container ${isSubtask ? 'is-subtask' : ''}`}
            style={{ '--cat-color': categoryColor }}
        >

            <div className="task-row-wrapper">

                <div className="task-options-panel">
                    <EditIcon 
                        className="option-btn edit" 
                        onClick={handleOptionClickEdit}
                    />

                    <SplitIcon 
                        className="option-btn split" 
                        onClick={handleOptionClickSplit}
                    />

                    <DeleteIcon 
                        className="option-btn delete" 
                        onClick={handleOptionClickDelete}
                    />
                </div>

                <div className={`task-swipe-content ${isExpandedOptions ? 'panel-open' : ''}`}>

                    <div className="task-card">

                        {!isSubtask && (
                            <div className="task-category-header">
                                {categoryName}
                            </div>
                        )}
                        {isSubtask && (
                            <div className="subtask-header">
                            </div>
                        )}
                    </div>

                    <div className="task-content-box">

                        

                        <div className="task-left">
                            <div 
                                className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                                onClick={handleCheckedTask}
                            >
                                {isCompleted && <CheckIcon className="dot"></CheckIcon>}
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

                            <TriangleArrowIcon 
                                className={`task-expand-options ${isExpandedOptions ? 'options-expanded' : ''}`} 
                                onClick={handleExpandOptions}
                            />
                        
                        </div>

                        
                    </div>
                
                </div>
            
            </div>


            {hasChildren && isExpanded && (
                <div className="subtasks-container">
                    {[...subtasks]
                    .sort((a, b) => a.id - b.id)
                    .map(subtask => (
                        <Task 
                            key={subtask.id} 
                            task={{ ...subtask, parentId: task.id }} 
                            isSubtask={true}
                            onStatusChange={onStatusChange}
                        />
                    ))}
                </div>
            )}

        </div>

    );
};

export default Task;
