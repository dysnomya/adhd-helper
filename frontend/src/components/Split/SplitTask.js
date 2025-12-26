
import React, { useState } from "react";
import { timeDisplay } from "../../functions/TasksHelpers";
import { ReactComponent as Clock} from "../../assets/clock_icon.svg";
import { ReactComponent as SplitIcon} from "../../assets/Git merge.svg";
import { ReactComponent as Edit} from "../../assets/Edit 2.svg";
import { ReactComponent as Delete} from "../../assets/Trash.svg";
import { ReactComponent as Accept} from "../../assets/Check.svg";
import { ReactComponent as Cancel} from "../../assets/X.svg";
import { ReactComponent as Chevron} from "../../assets/Chevron right.svg";
import { GoogleGenerativeAI } from "@google/generative-ai";

// import { fetchSubtasks } from "../../api/TaskApi"

const SplitTask = ({ task, isSubtask = false, onDelete }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isActionsShown, setIsActionsShown] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [taskTime, setTaskTime] = useState(task.timeNeeded);
    const [taskTimeMetric, setTaskTimeMetric] = useState('min');
    const [oldTaskTimeMetric, setOldTaskTimeMetric] = useState('min');
    const [subtasks, setSubtasks] = useState([]);
    const [hasChildren, setHasChildren] = useState(false);
    
    const genAI = new GoogleGenerativeAI("");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const categoryColor = task.category ? task.category.color : "#828282ff";
    const categoryName = task.category ? task.category.name : 'Ogólne';

    const handleToggleSubtask = async () => {
        if(!hasChildren) return;
        const newState = !isExpanded;
        setIsExpanded(!isExpanded);
    };

    const splitSubTask = async () => {
        const prompt = `
                Rozbij zadanie "${task.name}" na kilka (do 8) mniejszych kroków.
                Zwróć odpowiedź WYŁĄCZNIE jako czysty tablicowy format JSON.
                Każdy obiekt w tablicy musi mieć pola:
                - "id": numer kroku
                - "name": krótka nazwa kroku
                - "day": użyj dzisiejszej daty (${new Date().toISOString().split('T')[0]})
                - "timeNeeded": wyestymuj czas wykonywania zadania w minutach
                
                Format wyjściowy:
                [
                {"id": ..., "name": "...", "day": "...", "timeNeeded": ...},
                ...
                ]
            `;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            
            // Oczyszczanie tekstu (Gemini czasem dodaje ```json ... ```)
            const cleanedJson = responseText.replace(/```json|```/g, "").trim();
            const newSubTasks = JSON.parse(cleanedJson);

            setSubtasks(newSubTasks);
            setHasChildren(newSubTasks.length > 0);

            console.log("Wygenerowane podzadania:", newSubTasks);
    }

    const TaskInfo = () =>{
        if (isEdited) return(
            <input value={taskName} className={`split-task-name `} onChange={e => setTaskName(e.target.value)}>
            </input>
        )
        else return(
            <p className={`split-task-name `}>
                {task.name}
            </p>
        )
    }

    return (

        <div 
            className={`split-task-container ${isSubtask ? 'is-subtask' : ''}`}
            style={{ '--cat-color': categoryColor }}
        >
            <div className="split-task-bg">
                <div className={`split-task-card ${isActionsShown ? 'actions-shown' : ''}`}>
                    <div className="split-task-header">
                        {!isSubtask && (
                            <div className="split-task-header-text">
                                {task.id}
                            </div>
                        )}
                        <div className={`split-task-content-box`}>
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
                                    {isEdited ? (
                                        <input 
                                            value={taskName} 
                                            className="split-task-name" 
                                            onChange={e => setTaskName(e.target.value)}
                                            autoFocus // Opcjonalnie: pomaga ustawić fokus przy wejściu w tryb edycji
                                        />
                                    ) : (
                                        <p className="split-task-name">
                                            {task.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="split-task-right">
                                {(task.timeNeeded || isEdited) && (
                                    <span className="split-task-time">
                                        {isEdited ? (
                                                <span>
                                                <input type="number" value={oldTaskTimeMetric == "h" ? taskTime/60 : taskTime} className={`split-task-time `} onChange={e => setTaskTime(e.target.value)}></input>
                                                <select name="time-select" value={taskTimeMetric}  className={`split-task-time-select `} onChange={e => {setTaskTimeMetric(e.target.value); console.log(taskTimeMetric);}}>
                                                    <option value="min">min</option>
                                                    <option value="h">h</option>
                                                </select>
                                                </span>
                                            ) : (
                                                <span><span className="clock-icon"><Clock className="clock_icon"></Clock></span> {timeDisplay(task.timeNeeded)}</span>
                                            )
                                        }
                                        
        

                                        
                                    </span>
                                )}
                                
                                
                            </div>
                        </div>
                    </div>
                    <div className="split-task-chevron">
                        <Chevron className="split-task-bg-to-chevron-icon" onClick={() => {setIsActionsShown(!isActionsShown); if(isActionsShown) setIsEdited(false);}}></Chevron> 
                    </div>
                </div>

                {isEdited ? (
                    <div className="split-task-bg-icons">
                        <Accept className="split-task-bg-icon" onClick={() => {
                            
        
                            task.name = taskName;
                            console.log(oldTaskTimeMetric);
                            console.log(taskTimeMetric);
                            if (taskTimeMetric != oldTaskTimeMetric){
                                if(oldTaskTimeMetric == 'h') {
                                    task.timeNeeded = taskTime/60;
                                    setTaskTime(taskTime/60);
                                }
                                if(oldTaskTimeMetric == 'min'){
                                    task.timeNeeded = taskTime*60;
                                    setTaskTime(taskTime*60);
                                } 
                                
                                setOldTaskTimeMetric(taskTimeMetric);
                            }else{
                                task.timeNeeded = taskTime
                            }
                            
                            console.log(task.timeNeeded)
                            setIsEdited(false);
                            }}></Accept>
                        <Cancel className="split-task-bg-icon" onClick={() => setIsEdited(false)}></Cancel>
                     
                    </div>
                ) : (
                    <div className="split-task-bg-icons">
                        <Edit className="split-task-bg-icon" onClick={() => setIsEdited(true)}></Edit>
                        <SplitIcon className="split-task-bg-icon"onClick={splitSubTask}></SplitIcon>
                        <Delete className="split-task-bg-icon" onClick={onDelete}></Delete>
                    </div>
                )}
            </div>


            
            <div className="split-task-bg-up">
                <div className={`split-task-card ${isActionsShown ? 'actions-shown' : ''}`}>
                    
                    <div className="split-task-header">
                        {!isSubtask && (
                            <div className="split-task-header-text">
                                {task.id}
                            </div>
                        )}
                        <div className={`split-task-subtasks-bg `}>
                            <div className="split-task-content-box ">
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
                                        {isEdited ? (
                                            <input 
                                                value={taskName} 
                                                className="split-task-name" 
                                                onChange={e => setTaskName(e.target.value)}
                                                autoFocus // Opcjonalnie: pomaga ustawić fokus przy wejściu w tryb edycji
                                            />
                                        ) : (
                                            <p className="split-task-name">
                                                {task.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="split-task-right">
                                    {(task.timeNeeded || isEdited) && (
                                        <span className="split-task-time">
                                            {isEdited ? (
                                                    <span>
                                                    <input type="number" value={oldTaskTimeMetric == "h" ? taskTime/60 : taskTime} className={`split-task-time `} onChange={e => setTaskTime(e.target.value)}></input>
                                                    <select name="time-select" value={taskTimeMetric}  className={`split-task-time-select `} onChange={e => {setTaskTimeMetric(e.target.value); console.log(taskTimeMetric);}}>
                                                        <option value="min">min</option>
                                                        <option value="h">h</option>
                                                    </select>
                                                    </span>
                                                ) : (
                                                    <span><span className="clock-icon"><Clock className="clock_icon"></Clock></span> {timeDisplay(task.timeNeeded)}</span>
                                                )
                                            }
                                        

                                            
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
                    </div>
                        
                        
                    
                    
                </div>
            </div>
            
        </div>




/* 
            <div className="split-task-bg">
                {/* {isEdited ? (
                    <div className="split-task-bg-icons">
                        <Accept className="split-task-bg-icon" onClick={() => {
                            
        
                            task.name = taskName;
                            console.log(oldTaskTimeMetric);
                            console.log(taskTimeMetric);
                            if (taskTimeMetric != oldTaskTimeMetric){
                                if(oldTaskTimeMetric == 'h') {
                                    task.timeNeeded = taskTime/60;
                                    setTaskTime(taskTime/60);
                                }
                                if(oldTaskTimeMetric == 'min'){
                                    task.timeNeeded = taskTime*60;
                                    setTaskTime(taskTime*60);
                                } 
                                
                                setOldTaskTimeMetric(taskTimeMetric);
                            }else{
                                task.timeNeeded = taskTime
                            }
                            
                            console.log(task.timeNeeded)
                            setIsEdited(false);
                            }}></Accept>
                        <Cancel className="split-task-bg-icon" onClick={() => setIsEdited(false)}></Cancel>
                     
                    </div>
                ) : (
                    <div className="split-task-bg-icons">
                        <Edit className="split-task-bg-icon" onClick={() => setIsEdited(true)}></Edit>
                        <SplitIcon className="split-task-bg-icon"onClick={splitSubTask}></SplitIcon>
                        <Delete className="split-task-bg-icon" onClick={onDelete}></Delete>
                    </div>
                )} 
                

            </div>
             <div className={`split-task-bg-to-chevron ${isActionsShown ? 'actions-shown' : ''}`}>
                
                <div className="split-task-bg-to-chevron-icons">
                    <Chevron className="split-task-bg-to-chevron-icon" onClick={() => {
                        }}></Chevron>                    
                </div>
            
                

            </div> 
            <div className={`split-task-card-container ${isActionsShown ? 'actions-shown' : ''}`}>
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
                            {isEdited ? (
                                <input 
                                    value={taskName} 
                                    className="split-task-name" 
                                    onChange={e => setTaskName(e.target.value)}
                                    autoFocus // Opcjonalnie: pomaga ustawić fokus przy wejściu w tryb edycji
                                />
                            ) : (
                                <p className="split-task-name">
                                    {task.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="split-task-right">
                        {(task.timeNeeded || isEdited) && (
                            <span className="split-task-time">
                                {isEdited ? (
                                        <span>
                                        <input type="number" value={oldTaskTimeMetric == "h" ? taskTime/60 : taskTime} className={`split-task-time `} onChange={e => setTaskTime(e.target.value)}></input>
                                        <select name="time-select" value={taskTimeMetric}  className={`split-task-time-select `} onChange={e => {setTaskTimeMetric(e.target.value); console.log(taskTimeMetric);}}>
                                            <option value="min">min</option>
                                            <option value="h">h</option>
                                        </select>
                                        </span>
                                    ) : (
                                        <span><span className="clock-icon"><Clock className="clock_icon"></Clock></span> {timeDisplay(task.timeNeeded)}</span>
                                    )
                                }
                                
                                {isSubtask ? (
                                    <span></span>
                                ) : (
                                    <button onClick={() => {setIsActionsShown(!isActionsShown); if(isActionsShown) setIsEdited(false);}}>rozw</button>
                                )}

                                
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

        </div> */

    );

};

export default SplitTask;
