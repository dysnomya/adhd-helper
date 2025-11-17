
import React, { useState } from "react";
import { fetchSubtasks } from "../../api/TaskApi"

const Task = ({ task }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [subtasks, setSubtasks] = useState([]);
    const [isLoadingSubtasks, setIsLoadingSubtasks] = useState(false);

    const isMainTask = task.parentId === null;

    const bg = task.parentId === null ? "#FFF66F" : "#6bff9aff" ;

    const canExpand = task.hasSubtasks && isMainTask;


    const handleToggleSubtask = async () => {
        if(!canExpand) return;

        const newState = !isExpanded;
        setIsExpanded(newState);

        if (newState && subtasks.length === 0) {
            setIsLoadingSubtasks(true);

            let fetchedSubtasks;

            try {
                fetchedSubtasks = await fetchSubtasks(task.id);

                const processedSubtasks = fetchedSubtasks.map(subtask => ({
                    ...subtask,
                    hasSubtasks: false
                }));

                setSubtasks(processedSubtasks);

            } catch (error) {
                console.error("Błąd pobierania podzadań: ", error);
            } finally {
                setIsLoadingSubtasks(false);
            }
        }

    };

    return (

        <div style={{display: "flex", flexDirection: "column", background: bg, padding: "10px", margin: "7px"}}>

            <div style={{ display: "flex"}}>

                <input type="checkbox"></input>

   
                {canExpand && (
                    <span 
                        onClick={handleToggleSubtask} 
                        style={{ cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}
                    >
                        {isExpanded ? '▼' : '►'}
                    </span>
                )}
                    
                {!canExpand && isMainTask && <span style={{ marginRight: '28px' }}></span>}

                <b><p>{task.name}</p></b>
                <p style={{marginLeft: "15px"}}>kat: {task.categoryId}</p>
                <p style={{marginLeft: "15px"}}>status: {task.completed ? "ukończone" : "trwa"}</p>
                <p style={{marginLeft: "15px"}}>{task.priority}</p>
                <p style={{marginLeft: "15px"}}>czas: {task.timeNeeded}</p>
                <p style={{marginLeft: "15px"}}>data: {task.day}</p>
                <p style={{marginLeft: "15px"}}>user: {task.userId}</p>
                <p style={{marginLeft: "15px"}}>rodzic: {task.parentId}</p>

            </div>

            <div>


                {isExpanded && (
                    <div style={{ marginLeft: "30px", borderLeft: '3px solid #ccc', paddingLeft: '10px' }}>
                        {isLoadingSubtasks && <p>Ładowanie podzadań...</p>}

                        {!isLoadingSubtasks && subtasks.map(subtask => (
                            <Task 
                                key={subtask.id} 
                                task={{ ...subtask, hasSubtasks: false }} 
                            />
                        ))}
                    </div>
                )}

            </div>

        </div>
    );

};

export default Task;