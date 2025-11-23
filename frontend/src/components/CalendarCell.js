export default function CalendarCell(props) {
    return (
        <div
            className={props.day && "calendar-cell"}
            onClick={() => props.day && props.selectDate(props.day)}
            style={{ key: props.index }}
        >
            <div className={props.day && "calendar-cell-number"}>
                {props.day}
            </div>
            <div className="calendar-cell-content">
                
            </div>
        </div>
    );
}