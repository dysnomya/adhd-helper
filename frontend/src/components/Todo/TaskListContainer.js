
import React from "react";
import Task from "./Task"

const TaskListContainer = ({ datedTasks, onTaskStatusChange, onDeleteTask }) => {

    return (
        <div className="todo-task-list-container">

            {datedTasks.map(date => (
                <div key={date.title} className="todo-tasks-date-section">

                    <div className="todo-tasks-date-header">
                        <h2>{date.title}</h2>
                    </div>

                    <div className="todo-tasks-tasks-wrapper">
                        {date.tasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                onStatusChange={onTaskStatusChange}
                                onDeleteTask={onDeleteTask}
                            ></Task>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default TaskListContainer;