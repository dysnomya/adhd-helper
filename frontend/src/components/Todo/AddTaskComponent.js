import React, { useState } from "react";
import "../../styles/todo.scss";

import { ReactComponent as CheckIcon } from "../../assets/check_icon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-icon.svg";
import { ReactComponent as XIcon } from "../../assets/x-icon.svg";

import { DropdownPortal } from "./DropdownPortal";

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

const AddTaskComponent = ({
    categories,
    isSubtask = false,
    onConfirm,
    onCancel,
    initialDate = "",
    whereComponent = null
}) => {

    const [name, setName] = useState("");
    const [time, setTime] = useState(0);
    const [timeUnit, setTimeUnit] = useState('min');
    const [category, setCategory] = useState(null);
    const [priority, setPriority] = useState(null);
    const [date, setDate] = useState(initialDate);

    const [isCatPopupOpen, setIsCatPopupOpen] = useState(null);
    const [isPrioPopupOpen, setIsPrioPopupOpen] = useState(null);
    const [isDatePopupOpen, setIsDatePopupOpen] = useState(null);

    const handleSaveEdit = (e) => {
        e.stopPropagation();

        if (!name.trim()) {
            alert("Podaj nazwę zadania!");
            return;
        }

        const timeNeededConvert = timeUnit === "godz" ? parseInt(time) * 60 : parseInt(time);

        const newTask = {
            name: name,
            timeNeeded: isNaN(timeNeededConvert) ? 0 : timeNeededConvert,
            category: category,
            priority: priority,
            day: date,
            completed: false,
            subtasks: []
        };

        onConfirm(newTask);
    };
    
    const handleCancelEdit = (e) => {
        e.stopPropagation();
        onCancel();
    };


    const handleCatClick = (e) => {
        e.stopPropagation();
        if (isCatPopupOpen) {
            setIsCatPopupOpen(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setIsCatPopupOpen(rect);
            setIsPrioPopupOpen(null);
            setIsDatePopupOpen(null);
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
            setIsDatePopupOpen(null);
        }
    };

    const handleDateClick = (e) => {
        e.stopPropagation();
        if (isDatePopupOpen) {
            setIsDatePopupOpen(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setIsDatePopupOpen(rect);
            setIsCatPopupOpen(null);
            setIsPrioPopupOpen(null);
        }
    };

    const handleDateInput = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
    };

    const currentCatName = category ? category.name : "Wybierz kategorię";
    const currentCatColor = category ? category.color : "#828282ff";


    return (
        <div 
            className={`task-edit-wrapper ${isSubtask ? 'editing-subtask' : ''} ${whereComponent}` }
            style={{'--cat-color-edit': currentCatColor, '--prio-color-edit': priority ? getPriorityColor(priority) : currentCatColor }}
        >
            <div className={`task-edit-header add-task`}>

                {/* CATEGORY */}
                <div 
                    className={`edit-header-item choose-category`}
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
                                            setCategory(cat);
                                            setIsCatPopupOpen(null);
                                        }}
                                    >
                                        <p>{cat.name}</p>
                                    </div>
                                ))}
                                <div 
                                    className="edit-task-category-item"
                                    style={{'--cat-color': "#828282ff"}}
                                    onClick={() => {
                                        setCategory(null);
                                        setIsCatPopupOpen(null);
                                    }}
                                >
                                    <p>Bez kategorii</p>
                                </div>
                            </div>
                        </DropdownPortal>
                    )}

                </div>

                {/* PRIORITY */}
                <div 
                    className="edit-header-item choose-priority" 
                    onClick={handlePrioClick}
                >
                    <span>{getPriorityName(priority) || "Priorytet"} ▾</span>

                    {isPrioPopupOpen && (
                        <DropdownPortal rect={isPrioPopupOpen} onClose={() => setIsPrioPopupOpen(null)}>
                            <div className="edit-popup-list right">
                                <div className="edit-task-priority-item high" onClick={() => { setPriority('HIGH'); setIsPrioPopupOpen(null); }}>Wysoki</div>
                                <div className="edit-task-priority-item medium" onClick={() => { setPriority('MEDIUM'); setIsPrioPopupOpen(null); }}>Średni</div>
                                <div className="edit-task-priority-item low" onClick={() => { setPriority('LOW'); setIsPrioPopupOpen(null); }}>Niski</div>
                                <div className="edit-task-priority-item default" onClick={() => { setPriority(null); setIsPrioPopupOpen(null); }}>Brak</div>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nazwa zadania..."
                />

                <div className="edit-time-group">
                    <input 
                        type="number" 
                        className="edit-input-time"
                        value={time}    
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <div className="edit-unit-toggle" onClick={() => setTimeUnit(timeUnit === 'min' ? 'godz' : 'min')}>
                        {timeUnit}
                    </div>
                </div>
            </div>

            <div className="task-edit-actions-sidebar">
                <CheckIcon className="action-btn confirm" onClick={handleSaveEdit}></CheckIcon>
                <CalendarIcon 
                    className="action-btn date"
                    onClick={handleDateClick}
                ></CalendarIcon>

                {isDatePopupOpen && (
                    <DropdownPortal rect={isDatePopupOpen} onClose={() => setIsDatePopupOpen(null)}>
                        <div className='edit-date-picker-container'>
                            <input 
                                type="date" 
                                className="date-input"
                                value={date}
                                onChange={handleDateInput}
                            />

                        </div>
                    </DropdownPortal>
                )}
                

                <XIcon className="action-btn cancel" onClick={handleCancelEdit}></XIcon>
            </div>



        </div>
    );
};

export default AddTaskComponent;