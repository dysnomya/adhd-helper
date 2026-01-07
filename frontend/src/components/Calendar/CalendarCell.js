export default function CalendarCell(props) {
    const isTabbable = props.day && !props.openPanel;

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
                {props.day && props.taskCounts?.map((count, index) => {
                    const classes = [];
                    if (count > 0) classes.push("calendar-cell-task-count");

                    classes.push(
                        index === 0 ? "priority-low"
                            : index === 1 ? "priority-medium"
                                : "priority-high"
                    );

                    return (
                        <div key={index} className={classes.join(" ")}>
                            {count > 0 && count}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}