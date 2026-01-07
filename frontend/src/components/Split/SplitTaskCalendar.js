
import React, { useState } from "react";

const SplitTaskCalendar = ({ task, isSubtask = false, onClick, isSelected, selectedCategory, selectAllTasks}) => {
    const [taskName, setTaskName] = useState(task.name);
    const categoryColor = selectedCategory ? selectedCategory.color : "#828282ff";
    const categoryName = task.category ? task.category.name : 'Ogólne';

    return (
        <div className={`split-task-container-calendar ${isSelected && !selectAllTasks ? 'selected-calendar-task' : ''}  ${selectAllTasks ? 'disabled-task' : ''}` } onClick={() => {if(!selectAllTasks) onClick();}} style={{ '--cat-color': categoryColor }}>   
            <div className="split-task-calendar-up">
                <div className="split-task-card-calendar">         
                    <div className="split-task-header">
                        <div className="split-task-header-text">
                            {task.id}
                        </div>
                        
                            <div className="split-task-content-box-calendar ">
                                <div className="split-task-left-calendar">
                                    <div className={`split-custom-checkbox-calendar`}>
                                        <div className="dot"></div>
                                    </div>

                                    <div className="split-task-info-calendar">   
                                        <p className="split-task-name-calendar">
                                            {task.name}
                                        </p>
                                        
                                    </div>
                                </div>
                            </div>
                    </div>       
                </div>
            </div>
        </div>
    );

};

export default SplitTaskCalendar;
