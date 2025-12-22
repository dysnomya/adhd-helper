
import React from "react";
import SplitTask from "./SplitTask"

const SplitTaskListContainer = ({ splittedTasks }) => {

    return (
        <div className="split-task-list-container">
            {/* Dodajemy sprawdzenie && oraz opcjonalne chainowanie ?. */}
            {splittedTasks && splittedTasks.map((task, index) => (
                <SplitTask
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                />
            ))}
        </div>
    );
};

export default SplitTaskListContainer;