
import React, { useState } from "react";
// import { fetchSubtasks } from "../../api/TaskApi"

const Task = ({ task }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    // const [subtasks, setSubtasks] = useState(task.subtasks || []);
    const subtasks = task.subtasks || [];
    // const [isLoadingSubtasks, setIsLoadingSubtasks] = useState(false);

    // const isMainTask = task.parentId === null || task.parentId === undefined;

    const categoryColor = task.category ? task.category.color : "#dfdfdf" ;

    const hasChildren = subtasks.length > 0;


    const handleToggleSubtask = async () => {
        if(!hasChildren) return;
        // const newState = !isExpanded;
        setIsExpanded(!isExpanded);
    };

    return (

        <div style={{display: "flex", flexDirection: "column", background: categoryColor, padding: "10px", margin: "7px"}}>

            <div style={{ display: "flex"}}>

                <input type="checkbox" defaultChecked={task.completed}></input>

   
                {hasChildren ? (
                    <span 
                        onClick={handleToggleSubtask} 
                        style={{ cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}
                    >
                        {isExpanded ? '▼' : '►'}
                    </span>
                ) : (
                    <span style={{ marginRight: '25px' }}></span>
                )}
                    

                <b><p>{task.name}</p></b>
                <p style={{marginLeft: "15px"}}>kat: {task.category ? task.category.name : "brak kategorii"}</p>
                <p style={{marginLeft: "15px"}}>status: {task.completed ? "ukończone" : "trwa"}</p>
                <p style={{marginLeft: "15px"}}>{task.priority}</p>
                <p style={{marginLeft: "15px"}}>czas: {task.timeNeeded}</p>
                <p style={{marginLeft: "15px"}}>data: {task.day}</p>
                {/* <p style={{marginLeft: "15px"}}>user: {task.userId}</p>
                <p style={{marginLeft: "15px"}}>rodzic: {task.parentId}</p> */}

            </div>

            <div>


                {isExpanded && (
                    <div style={{ marginLeft: "30px", borderLeft: '3px solid #ccc', paddingLeft: '10px' }}>
                        
                        {subtasks.map(subtask => (
                            <Task 
                                key={subtask.id} 
                                task={{ ...subtask, parentId: task.id }} 
                            />
                        ))}
                        
                    </div>
                )}

            </div>

        </div>
    );

};

export default Task;