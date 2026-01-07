
import React from "react";
import SplitTask from "./SplitTask"
import SplitTaskCalendar from "./SplitTaskCalendar"
import { useState } from "react";

const SplitTaskListContainer = ({ splittedTasks, setGeminiAsked, isCalendarTasks, selectedTasks, setSelectedTasks, selectedCategory, selectAllTasks }) => {

    const [tasks, setTasks] = useState(splittedTasks || []);
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const removeTask = async (indexToRemove) => {
        await sleep(200);
        tasks.forEach(task => {
            if(task.id > indexToRemove) task.id = task.id-1 
        });
        setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToRemove));
        
    };

    const handleClick = ( clickedTask ) => {
        if (selectedTasks.find(task => task.id === clickedTask.id)){
            setSelectedTasks(selectedTasks.filter((task, _) => task.id !== clickedTask.id))
        }
        else{
            setSelectedTasks( // Replace the state
            [ // with a new array
                ...selectedTasks, // that contains all the old items
                clickedTask // and one new item at the end
            ]
            );
        }
        console.log(selectedTasks);
    }

    return (
        <div className={` ${isCalendarTasks ? "split-task-list-container-calendar" : "split-task-list-container"}  ${selectAllTasks ? 'select-all-tasks' : ''}`}>
            {/* Dodajemy sprawdzenie && oraz opcjonalne chainowanie ?. */}
            {tasks && tasks.map((task, index) => (
                !isCalendarTasks ? 
                    <SplitTask
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                    onDelete={() => removeTask(index)}
                    setGeminiAsked={setGeminiAsked}
                    />
                    :
                    <SplitTaskCalendar
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                    onDelete={() => removeTask(index)}
                    setGeminiAsked={setGeminiAsked}
                    onClick={() => handleClick(task)}
                    isSelected={selectedTasks.some(t => t.id === task.id)}
                    selectedCategory={selectedCategory}
                    selectAllTasks={selectAllTasks}
                    />   
            ))}
        </div>
    );
};

export default SplitTaskListContainer;