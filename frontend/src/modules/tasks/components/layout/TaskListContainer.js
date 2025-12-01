
import React from "react";

import Task from "../ui/Task"

const TaskListContainer = ({ datedTasks }) => {

    return (
        <div style={{margin: "20px"}}>

            {datedTasks.map(date => (
                <div key={date.title}>

                    <h2 style={{marginTop: '20px', borderBottom: '1px solid #ccc'}}>
                        {date.title}
                    </h2>

                    {date.tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                        ></Task>
                    ))}

                </div>
            ))}

        </div>
    );

};

export default TaskListContainer;