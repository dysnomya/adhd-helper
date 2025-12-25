
import React, { useState, useEffect, useRef } from "react";
import "../../styles/todo.scss";
import { timeDisplay } from "../../functions/TasksHelpers";
import { ReactComponent as Clock} from "../../assets/clock_icon.svg";

import { ReactComponent as CheckIcon } from "../../assets/check_icon.svg";
import { ReactComponent as TriangleArrowIcon } from "../../assets/triangle-arrow-button.svg";

import { ReactComponent as EditIcon } from "../../assets/edit-button.svg";
import { ReactComponent as SplitIcon } from "../../assets/split-button.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-button.svg";

import { ReactComponent as CalendarIcon } from "../../assets/calendar-icon.svg";
import { ReactComponent as XIcon } from "../../assets/x-icon.svg";

import { DropdownPortal } from "../Todo/DropdownPortal"

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'HIGH': return '#D22727';
        case 'MEDIUM': return '#E9BD2B';
        case 'LOW': return '#A5DD3C';
        default: return 'transparent';
    }
};

const getPriorityName = (priority) => {
    switch (priority) {
        case 'HIGH': return 'Wysoki';
        case 'MEDIUM': return 'Średni';
        case 'LOW': return 'Niski';
        default: return '';
    }
};

const Task = ({ task, isSubtask = false, onStatusChange, inCalendar = false, onDeleteTask, onUpdateTask, categories }) => {

    const [isCompleted, setIsCompleted] = useState(task.completed);              // checkbox
    const [isExpanded, setIsExpanded] = useState(false);                         // subtasks
    const [isExpandedOptions, setIsExpandedOptions] = useState(false);           // options
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);       // delete popup
    const [isEditing, setIsEditing] = useState(false);                           // edit task

    const subtasks = task.subtasks || [];
    const hasChildren = subtasks.length > 0;
    const debounceTimer = useRef(null);

    const categoryColor = task.category ? task.category.color : "#828282ff" ;
    const categoryName = task.category ? task.category.name : 'Ogólne';

    const priorityColor = getPriorityColor(task.priority);
    const finalPriorityColor = task.priority ? priorityColor : 'var(--cat-color)';

    // editing
    const [editName, setEditName] = useState(task.name);
    const [editTime, setEditTime] = useState(task.timeNeeded || 0);
    const [editTimeUnit, setEditTimeUnit] = useState('min');
    const [editCategory, setEditCategory] = useState(task.category || null);
    const [editPriority, setEditPriority] = useState(task.priority || null);

    const [isCatPopupOpen, setIsCatPopupOpen] = useState(null);
    const [isPrioPopupOpen, setIsPrioPopupOpen] = useState(null);

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

    const handleOptionClickSplit = () => {
        console.log("Splitting")
    }

    const handleOptionClickDelete = (e) => {
        e.stopPropagation();
        setIsDeleteConfirmOpen(true);
    }

    const handleCancelDelete = (e) => {
        e.stopPropagation();
        setIsDeleteConfirmOpen(false);
    };

    const handleConfirmDelete = (e) => {
        e.stopPropagation();
        onDeleteTask(task.id);
    };


    // editing
    const handleOptionClickEdit = (e) => {
        e.stopPropagation();
        setEditName(task.name);
        setEditTime(task.timeNeeded || 0);
        setEditCategory(task.category);
        setEditPriority(task.priority);
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.stopPropagation();

        // depending on the backend (API CALL)

        const updatedData = {
            name: editName,
            timeNeeded: editTimeUnit === "godz" ? parseInt(editTime) * 60 : parseInt(editTime),
            category: editCategory,
            priority: editPriority
        };

        try {
            await onUpdateTask(task.id, updatedData);
            setIsEditing(false);
        } catch (error) {
            alert("Błąd zapisu edytowanych danych.");
        }
    };

    const handleCancelEdit = (e) => {
        e.stopPropagation();
        setIsEditing(false);
    };



    const handleCatClick = (e) => {
        e.stopPropagation();
        if (isCatPopupOpen) {
            setIsCatPopupOpen(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setIsCatPopupOpen(rect);
            setIsPrioPopupOpen(null);
        }
    };

    const handlePrioClick = (e) => {
        e.stopPropagation();
        if (isPrioPopupOpen) {
            setIsPrioPopupOpen(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setIsPrioPopupOpen(rect);
            setIsCatPopupOpen(null);
        }
    };
    
    let selectedCategory = null;
    if (editCategory !== null) {
        selectedCategory = categories?.find(c => c.id === editCategory.id);
    }
    
    const currentCatName = selectedCategory ? selectedCategory.name : "Wybierz kategorię";
    const currentCatColor = selectedCategory ? selectedCategory.color : "#828282ff";

    return (

        <div 
            className={`task-container ${isSubtask ? 'is-subtask' : ''} ${isEditing ? 'editing-mode' : ''}`}
            style={{ '--cat-color': categoryColor, '--prio-color': finalPriorityColor, '--cat-color-edit': currentCatColor, '--prio-color-edit': editPriority ? getPriorityColor(editPriority) : currentCatColor }}
        >

      

            {isEditing ? (
                
                <div className="task-edit-wrapper">
                    <div className="task-edit-header">

                        {/* CATEGORY */}
                        <div 
                            className="edit-header-item"
                            onClick={handleCatClick}
                        >
                            <span>{currentCatName} ▾</span>
                            {isCatPopupOpen && (
                                <DropdownPortal rect={isCatPopupOpen} onClose={() => setIsCatPopupOpen(null)}>
                                    <div className="edit-popup-list left">
                                        {categories.map(cat => (
                                            <div 
                                                key={cat.id} 
                                                className="edit-task-category-item"
                                                style={{'--cat-color': cat.color}}
                                                onClick={() => {
                                                    setEditCategory(cat);
                                                    setIsCatPopupOpen(null);
                                                }}
                                            >
                                                <p>{cat.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </DropdownPortal>
                            )}

                        </div>

                        {/* PRIORITY */}
                        <div 
                            className="edit-header-item" 
                            onClick={handlePrioClick}
                        >
                            <span>{getPriorityName(editPriority) || "Priorytet"} ▾</span>

                            {isPrioPopupOpen && (
                                <DropdownPortal rect={isPrioPopupOpen} onClose={() => setIsPrioPopupOpen(null)}>
                                    <div className="edit-popup-list right">
                                        <div onClick={() => { setEditPriority('HIGH'); setIsPrioPopupOpen(null); }}>Wysoki</div>
                                        <div onClick={() => { setEditPriority('MEDIUM'); setIsPrioPopupOpen(null); }}>Średni</div>
                                        <div onClick={() => { setEditPriority('LOW'); setIsPrioPopupOpen(null); }}>Niski</div>
                                        <div onClick={() => { setEditPriority(null); setIsPrioPopupOpen(null); }}>Brak</div>
                                    </div>
                                </DropdownPortal>
                            )}
                        </div>


                    </div>

                    {/* INPUTS */}

                    <div className="task-edit-body">
                        <div className="edit-circle-icon"></div>
                        
                        <input 
                            type="text" 
                            className="edit-input-name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Nazwa zadania..."
                        />

                        <div className="edit-time-group">
                            <input 
                                type="number" 
                                className="edit-input-time"
                                value={editTime}    
                                onChange={(e) => setEditTime(e.target.value)}
                            />
                            <div className="edit-unit-toggle" onClick={() => setEditTimeUnit(editTimeUnit === 'min' ? 'h' : 'min')}>
                                {editTimeUnit}
                            </div>
                        </div>
                    </div>

                    <div className="task-edit-actions-sidebar">
                        <CheckIcon className="action-btn confirm" onClick={handleSaveEdit}></CheckIcon>
                        <CalendarIcon className="action-btn date"></CalendarIcon>
                        <XIcon className="action-btn cancel" onClick={handleCancelEdit}></XIcon>
                    </div>



                </div>


            ) : (
            
                <>
                {/* TASK */}
                <div className={`task-row-wrapper ${isDeleteConfirmOpen ? 'allow-overflow' : ''} `}>

                    {/* DELETE TASK CONFIRM POPUP */}
                    {isDeleteConfirmOpen && (
                        <div className="delete-confirm-popup">
                            <p className="delete-confirm-text">Usunąć na zawsze?</p>
                            <div className="delete-confirm-actions">
                                <button className="btn-cancel" onClick={handleCancelDelete}>
                                    Anuluj
                                </button>
                                <button className="btn-delete" onClick={handleConfirmDelete}>
                                    Usuń
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={`task-options-panel ${inCalendar ? 'in-calendar' : ''}`}>
                        <EditIcon 
                            className="option-btn edit" 
                            onClick={handleOptionClickEdit}
                        />

                        <SplitIcon 
                            className="option-btn split" 
                            onClick={handleOptionClickSplit}
                        />


                        <div className="delete-btn-wrapper">

                            <DeleteIcon 
                                className="option-btn delete" 
                                onClick={handleOptionClickDelete}
                            />

                        </div>

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
                                    className={`task-expand-options ${isExpandedOptions ? 'options-expanded' : ''} ${inCalendar ? 'in-calendar' : ''}`} 
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
                                onDeleteTask={onDeleteTask}
                            />
                        ))}
                    </div>
                )} 

                </>

            )}
    

            



        </div> // task container

    );
};

export default Task;
