
import React from "react";
import SplitTask from "./SplitTask"
import { useState } from "react";

const SplitTaskListContainer = ({ splittedTasks }) => {

    const [tasks, setTasks] = useState(splittedTasks || []);

    const removeTask = (indexToRemove) => {
        tasks.forEach(task => {
            if(task.id > indexToRemove) task.id = task.id-1 
        });
        setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToRemove));
        
    };

    return (
        <div className="split-task-list-container">
            {/* Dodajemy sprawdzenie && oraz opcjonalne chainowanie ?. */}
            {tasks && tasks.map((task, index) => (
                <SplitTask
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                    onDelete={() => removeTask(index)}
                />
            ))}
        </div>
    );
};

export default SplitTaskListContainer;