import React, { useState, useRef, useEffect, useMemo } from "react";
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
    const [time, setTime] = useState(5);
    const [timeUnit, setTimeUnit] = useState('min');
    const [category, setCategory] = useState(null);
    const [priority, setPriority] = useState(null);
    const [date, setDate] = useState(initialDate);

    const [isCatPopupOpen, setIsCatPopupOpen] = useState(null);
    const [isPrioPopupOpen, setIsPrioPopupOpen] = useState(null);
    const [isDatePopupOpen, setIsDatePopupOpen] = useState(null);

    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const nameInputRef = useRef(null);
    const cancelBtnRef = useRef(null);
    const dateInputRef = useRef(null);
    const calendarBtnRef = useRef(null)

    const priorityOptions = useMemo(() => [
        { value: 'HIGH', label: 'Wysoki', className: 'high' },
        { value: 'MEDIUM', label: 'Średni', className: 'medium' },
        { value: 'LOW', label: 'Niski', className: 'low' }
    ], []);

    useEffect(() => {
        const handleFocusTrap = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey && document.activeElement === nameInputRef.current) {
                e.preventDefault();
                cancelBtnRef.current?.focus();
            }
            else if (!e.shiftKey && document.activeElement === cancelBtnRef.current) {
                e.preventDefault();
                nameInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleFocusTrap);
        return () => window.removeEventListener('keydown', handleFocusTrap);
    }, []);


    useEffect(() => {
        if (isCatPopupOpen || isPrioPopupOpen) {
            setHighlightedIndex(0);
        }
    }, [isCatPopupOpen, isPrioPopupOpen]);


    const handleListKeyDown = (e, itemsCount, onConfirmSelection) => {
        if (!isCatPopupOpen && !isPrioPopupOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev + 1) % itemsCount);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev - 1 + itemsCount) % itemsCount);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onConfirmSelection(highlightedIndex);
        } else if (e.key === 'Escape') {
            setIsCatPopupOpen(null);
            setIsPrioPopupOpen(null);
        }
    };


    const onCategoryKeyDown = (e) => {
        if (isCatPopupOpen) {
            const totalItems = categories.length + 1; 
            
            handleListKeyDown(e, totalItems, (index) => {
                if (index < categories.length) {
                    setCategory(categories[index]);
                } else {
                    setCategory(null);
                }
                setIsCatPopupOpen(null);
            });
        } else {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                handleCatClick(e);
            }
        }
    };


    const onPriorityKeyDown = (e) => {
        if (isPrioPopupOpen) {
            handleListKeyDown(e, priorityOptions.length, (index) => {
                setPriority(priorityOptions[index].value);
                setIsPrioPopupOpen(null);
            });
        } else {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                handlePrioClick(e);
            }
        }
    };


    const handleSimpleKeyDown = (e, callback) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback(e);
        }
    };

    const handleSaveEdit = (e) => {
        if (e) e.stopPropagation();

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
        if (e) e.stopPropagation();
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
        <div className="add-task-overlay" onClick={onCancel}>
            <div className="add-task-modal-container" onClick={(e) => e.stopPropagation()}>

                <div 
                    className={`task-edit-wrapper ${isSubtask ? 'editing-subtask' : ''} ${whereComponent}` }
                    style={{'--cat-color-edit': currentCatColor, '--prio-color-edit': priority ? getPriorityColor(priority) : currentCatColor }}
                >
                    <div className={`task-edit-header add-task`}>

                        {/* CATEGORY */}
                        <div 
                            className={`edit-header-item choose-category`}
                            onClick={handleCatClick}
                            tabIndex={4} 
                            role="button"
                            onKeyDown={onCategoryKeyDown}
                        >
                            <span>{currentCatName} ▾</span>
                            {isCatPopupOpen && (
                                <DropdownPortal rect={isCatPopupOpen} onClose={() => setIsCatPopupOpen(null)}>
                                    <div className="edit-popup-list left">
                                        {categories.map((cat, index) => (
                                            <div 
                                                key={cat.id} 
                                                className={`edit-task-category-item ${index === highlightedIndex ? 'highlighted' : ''}`}
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
                                            className={`edit-task-category-item ${categories.length === highlightedIndex ? 'highlighted' : ''}`}
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
                            tabIndex={5}
                            role="button"
                            onKeyDown={onPriorityKeyDown}
                        >
                            <span>{getPriorityName(priority) || "Priorytet"} ▾</span>

                            {isPrioPopupOpen && (
                                <DropdownPortal rect={isPrioPopupOpen} onClose={() => setIsPrioPopupOpen(null)}>
                                    <div className="edit-popup-list right">
                                        {priorityOptions.map((option, index) => (
                                            <div 
                                                key={index}
                                                className={`edit-task-priority-item ${option.className} ${index === highlightedIndex ? 'highlighted' : ''}`} 
                                                onClick={() => { setPriority(option.value); setIsPrioPopupOpen(null); }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}

                                    </div>
                                </DropdownPortal>
                            )}
                        </div>


                    </div>

                    {/* INPUTS */}

                    <div className="task-edit-body">
                        <div className="edit-name-group">
                            <div className="edit-circle-icon"></div>
                        
                            <input 
                                ref={nameInputRef}
                                type="text" 
                                className="edit-input-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nazwa zadania..."
                                autoFocus
                                tabIndex={1}
                            />
                        </div>

                        <div className="edit-time-group">
                            <input 
                                type="number" 
                                className="edit-input-time"
                                value={time}    
                                onChange={(e) => setTime(e.target.value)}
                                tabIndex={2}
                            />
                            <div 
                                className="edit-unit-toggle" 
                                onClick={() => setTimeUnit(timeUnit === 'min' ? 'godz' : 'min')}
                                tabIndex={3}
                                role="button"
                                onKeyDown={(e) => handleSimpleKeyDown(e, () => setTimeUnit(timeUnit === 'min' ? 'godz' : 'min'))}
                            >
                                {timeUnit}
                            </div>
                        </div>
                    </div>

                    <div className="task-edit-actions-sidebar">
                        <CheckIcon 
                            className="action-btn confirm" 
                            onClick={handleSaveEdit}
                            tabIndex={7}
                            role="button"
                            onKeyDown={(e) => handleSimpleKeyDown(e, handleSaveEdit)}
                        ></CheckIcon>

                        <CalendarIcon 
                            ref={calendarBtnRef}
                            className="action-btn date"
                            onClick={handleDateClick}
                            tabIndex={6}
                            role="button"
                            onKeyDown={(e) => handleSimpleKeyDown(e, handleDateClick)}
                        ></CalendarIcon>

                        {isDatePopupOpen && (
                            <DropdownPortal rect={isDatePopupOpen} onClose={() => setIsDatePopupOpen(null)}>
                                <div className='edit-date-picker-container'>
                                    <input 
                                        ref={dateInputRef}
                                        type="date" 
                                        className="date-input"
                                        value={date}
                                        onChange={handleDateInput}
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Tab') {
                                                e.preventDefault();
                                            }

                                            else if (e.key === 'Enter' || e.key === 'Escape') {
                                                e.preventDefault();
                                                setIsDatePopupOpen(null);
                                                setTimeout(() => {
                                                    calendarBtnRef.current?.focus();
                                                }, 0);
                                            }
                                            else if (e.key === ' ') {
                                                e.preventDefault();
                                                try {
                                                    if(dateInputRef.current) {
                                                        dateInputRef.current.showPicker();
                                                    }
                                                } catch (error) {
                                                    console.warn("Przeglądarka nie obsługuje showPicker()", error);
                                                }
                                            }
                                        }}
                                    />

                                </div>
                            </DropdownPortal>
                        )}
                        

                        <XIcon 
                            ref={cancelBtnRef}
                            className="action-btn cancel" 
                            onClick={handleCancelEdit}
                            tabIndex={8}
                            role="button"
                            onKeyDown={(e) => handleSimpleKeyDown(e, handleCancelEdit)}
                        ></XIcon>
                    </div>



                </div>

            </div>
        </div>
    );
};

export default AddTaskComponent;