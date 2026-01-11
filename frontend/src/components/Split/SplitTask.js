
import React, { useState, useEffect } from "react";
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

const SplitTask = ({ task, isSubtask = false, onDelete, setGeminiAsked, subtasks, setSubtasks, setGeminiResult, geminiResult, onSubtaskDelete }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isActionsShown, setIsActionsShown] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [taskTime, setTaskTime] = useState(task.timeNeeded);
    const [taskTimeMetric, setTaskTimeMetric] = useState('min');
    const [oldTaskTimeMetric, setOldTaskTimeMetric] = useState('min');
    
    const genAI = new GoogleGenerativeAI("AIzaSyASUp9UVlusUXn-_wL_K9Fk_NkST9UZbSg");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const [localSubtasks, setLocalSubtasks] = useState(subtasks);

    useEffect( () => {
        setLocalSubtasks(subtasks);
    });

    const categoryColor = task.category ? task.category.color : "#828282ff";

    const handleToggleSubtask = async () => {
        if(localSubtasks === undefined) return;
        // if((localSubtasks.length <= 0)) return;
        const newState = !isExpanded;
        setIsExpanded(!isExpanded);
        console.log(isExpanded)
    };

    console.log(`localsubtassk ${task.id}`)
    console.log(localSubtasks);


   

    const splitSubTask = async () => {
        setGeminiAsked(true);
        try{
            const prompt = `
                Rozbij zadanie "${task.name}" na kilka (do 8) mniejszych kroków.
                Zwróć odpowiedź WYŁĄCZNIE jako czysty tablicowy format JSON.
                Każdy obiekt w tablicy musi mieć pola:

                - "id": numer kroku
                - "name": krótka nazwa kroku
                - "day": użyj dzisiejszej daty (${new Date().toISOString().split('T')[0]})
                - "priority": wybierz jedną z wartości: 'VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'
                - "timeNeeded": wyestymuj czas wykonywania zadania w minutach
                - "date": data wykonania zadania ZOSTAW PUSTE
                - "parentId" : ${task.id}
        
                Format wyjściowy:
                [
                {"id": ..., "name": "...", "day": "...", "priority": "...", "timeNeeded": ..., "date": null, "parentId": ${task.id}},
                ...
                ]}          
            `;
            setGeminiAsked(true);

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            
            // Oczyszczanie tekstu (Gemini czasem dodaje ```json ... ```)
            const cleanedJson = responseText.replace(/```json|```/g, "").trim();
            const newSubTasks = JSON.parse(cleanedJson);
            
            setGeminiAsked(false);
            setGeminiResult([...geminiResult,...newSubTasks]);
            // setSubtasks([...subtasks,newSubTasks]);
            console.log("Wygenerowane podzadania:", newSubTasks, "has", newSubTasks.subtaskList.length);

            onSubtaskDelete(task.id);

            setLocalSubtasks(newSubTasks);

        // setGeminiAsked(false);
        }
        catch (error) {
            console.error("Błąd podczas generowania zadań:", error);
            // Tutaj możesz np. wyświetlić powiadomienie dla użytkownika
        }
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

                                {(!isSubtask && localSubtasks.length > 0 ) && (
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
                                                <input type="number" value={oldTaskTimeMetric == "h" ? taskTime/60 : taskTime} className={`split-task-time-input `} onChange={e => setTaskTime(e.target.value)}></input>
                                                <select name="time-select" value={taskTimeMetric}  className={`split-task-time-select `} onClick={e => {if(e.target.value == 'min') { e.target.value='h';setTaskTimeMetric(e.target.value);} else{ e.target.value='min'}setTaskTimeMetric(e.target.value)}} onChange={e => {setTaskTimeMetric(e.target.value); console.log(taskTimeMetric);}}>
                                                        {/* <option value="min">min</option>
                                                        <option value="h">godz</option> */}
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
                        <Chevron className={`split-task-chevron-icon ${isActionsShown ? 'expanded' : ''}`} onClick={() => {setIsActionsShown(!isActionsShown); if(isActionsShown) setIsEdited(false); console.log(isActionsShown); /*matchSubtasks(task)*/}}></Chevron> 
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
                        <Cancel className="split-task-bg-icon" onClick={() => {setIsEdited(false); setTaskName(task)}}></Cancel>
                     
                    </div>
                ) : (
                    <div className="split-task-bg-icons">
                        <Edit className="split-task-bg-icon" onClick={() => setIsEdited(true)}></Edit>
                        { !isSubtask ?
                            <SplitIcon className="split-task-bg-icon"onClick={() => {splitSubTask(); setLocalSubtasks(subtasks)}}></SplitIcon>
                            :
                            <></>
                        }
                        <Delete className="split-task-bg-icon" onClick={() => {setLocalSubtasks([]);onDelete(); setLocalSubtasks(subtasks) }}></Delete>
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

                                    {(!isSubtask && localSubtasks.length > 0 ) && (
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
                                                    <input type="number" value={oldTaskTimeMetric == "h" ? taskTime/60 : taskTime} className={`split-task-time-input `} onChange={e => setTaskTime(e.target.value)}></input>
                                                    <select name="time-select" value={taskTimeMetric}  className={`split-task-time-select `} onClick={e => {if(e.target.value == 'min') { e.target.value='h';setTaskTimeMetric(e.target.value);} else{ e.target.value='min'}setTaskTimeMetric(e.target.value)}} onChange={e => {setTaskTimeMetric(e.target.value); console.log(taskTimeMetric);}}>
                                                        <option value="min">min</option>
                                                        <option value="h">godz</option>
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
                            {(!isSubtask && localSubtasks.length > 0 ) && isExpanded && (
                            <div className="split-subtasks-container">
                                {localSubtasks.map(subtask => (
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
    );

};

export default SplitTask;
