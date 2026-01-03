import { useState } from "react";

export default function SplitCalendarCell(props) {
    const isTabbable = props.day && !props.openPanel;

    const [tasks, setTasks] = useState([]);

    // setTasks(props.tasks);

    console.log(props.day, props.tasks)

    return (
        <div
            className={props.day && "calendar-cell"}
            onClick={props.onClick}
            tabIndex={isTabbable ? 0 : -1}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    props.onClick();
                }
            }}
        >
            <div className={props.day && "calendar-cell-number"}>
                {props.day}
            </div>
            <div className="calendar-cell-content">
                {props.tasks.map((task, index) => (
                        <span>{task.id}</span>
                    ))}
            </div>
        </div>
    );
}