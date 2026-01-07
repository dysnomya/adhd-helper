import { useState } from "react";

export default function SplitCalendarCell(props) {
    const isTabbable = props.day && !props.openPanel;

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
            <div className={props.day && "split-calendar-cell-number"}>
                {props.day}
            </div>
            <div className="split-calendar-cell-content">
                {props.tasks.map((task, index) => (
                        <div className="calendar-added-task" style={{ '--cat-color': props.selectedCategory.color }}><span className="calendar-added-task-text">{task.id}</span></div>
                    ))}
            </div>
        </div>
    );
}