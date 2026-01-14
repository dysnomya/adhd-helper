
import React from "react";
import SplitTask from "./SplitTask"
import SplitTaskCalendar from "./SplitTaskCalendar"
import { useState } from "react";

const SplitTaskListContainer = ({ splittedTasks, setGeminiAsked, isCalendarTasks, selectedTasks, setSelectedTasks, selectedCategory, selectAllTasks, selectedPriority, subtasks, setSubtasks, setGeminiResult}) => {

    const [tasks, setTasks] = useState(splittedTasks || []);
    
    

    console.log(selectedPriority);
    console.log("subtsaks");
    console.log(subtasks);
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const removeTask = async (taskToDelete) => {
        //usuwanie taska z json
        setGeminiResult(prevTasks => prevTasks.filter((task, _) => task.id !== taskToDelete.id));
        //usuwanie taska z obiektów
        setTasks(prevTasks => prevTasks.filter((task, _) => task.id !== taskToDelete.id));

        //usuwanie subtasków z json (wystarczy)
        setGeminiResult(prevTasks => prevTasks.filter((task, _) => ((task.parentId == null) || (task.parentId !== (taskToDelete.id)))));

        //zmiana id taskow
        setTasks(prevTasks => prevTasks.map(task => {
            if(task.id > taskToDelete.id) return {...task, id: task.id-1 }
            return task;
        }));

        // zmiana id taskow
        setGeminiResult((prevTasks => prevTasks.map(task => {
            if(task.id > taskToDelete.id) return {...task, id: task.id-1 }
            return task;
        })));
        
        //zmiana parentid subtaskow
        setGeminiResult((prevTasks => prevTasks.map(task => {
            if(task.parentId >= taskToDelete.id) return {...task, parentId: task.parentId-1 }
            return task;
        })));





        // await sleep(200);
        // tasks.forEach(task => {
        //     if(task.id > indexToRemove) task.id = task.id-1 
        // });
        // setTasks(prevTasks => prevTasks.filter((task, _) => task.id !== indexToRemove));
        // setGeminiResult(prevTasks => prevTasks.filter((task, _) => ((task.parentId == null) || (task.parentId !== (inTask.id)))));
        
    };

    const removeSubtask = async (taskToDelete) => {
        setGeminiResult(prevTasks => prevTasks.filter((task, _) => task.id !== taskToDelete.id));
        //usuwanie taska z obiektów
        setTasks(prevTasks => prevTasks.filter((task, _) => task.id !== taskToDelete.id));
    };


    // const matchSubtasks = (task) => {
    //     var newTask = {};

    //     var subT = subtasks.find(subtasksList => task.id === subtasksList.id);
    //     if (subT != null) {
    //         newTask = {...task, subtasks: subT.subtaskList};
    //     }

    //     setSplittedTasks(splittedTasks => {
    //         return splittedTasks.map( tmpTask => {
    //             if(tmpTask.id == newTask.id) return newTask;
    //             return tmpTask;
    //         });
    //     });
    // }

    

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
            {tasks && tasks.filter(task => task.parentId == null).map((task, index) => (
                !isCalendarTasks ? 
                    <SplitTask
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                    onDelete={() => removeTask(task)}
                    setGeminiAsked={setGeminiAsked}
                    subtasks={(splittedTasks.filter(Intask => Intask.parentId == task.id) === undefined) ? [] : splittedTasks.filter(Intask => Intask.parentId == task.id)}
                    setSubtasks={setSubtasks}
                    setGeminiResult={setGeminiResult}
                    geminiResult={splittedTasks}
                    // onSubtaskDelete={removeSubtasks}
                    removeSubtask={removeSubtask}
                    />
                    :
                    <SplitTaskCalendar
                    // Gemini nie zwraca ID, więc używamy indexu lub Date.now()
                    key={task.id || index} 
                    task={task}
                    onDelete={() => removeTask(task)}
                    setGeminiAsked={setGeminiAsked}
                    onClick={() => handleClick(task)}
                    isSelected={selectedTasks.some(t => t.id === task.id)}
                    selectedCategory={selectedCategory}
                    selectAllTasks={selectAllTasks}
                    selectedPriority={selectedPriority}
                    
                    />   
            ))}
        </div>
    );
};

export default SplitTaskListContainer;