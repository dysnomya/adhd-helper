export default function CalendarCell(props) {
    return (
        <div
            className={props.day && "calendar-cell"}
            style={{ key: props.index }}
            onClick={props.onClick}
        >
            <div className={props.day && "calendar-cell-number"}>
                {props.day}
            </div>
            <div className="calendar-cell-content">
                
            </div>
        </div>
    );
}