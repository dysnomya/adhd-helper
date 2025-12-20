import { ReactComponent as Arrow } from "../../assets/arrow-right.svg";
import { ReactComponent as EditButton } from "../../assets/edit-button.svg";
import Task from "../Todo/Task";
import { useNavigate } from "react-router-dom";
import { getDateString } from "../../functions/TextFunctions";


export default function CalendarSidePanel(props) {
    const navigate = useNavigate();
    const redirectTodo = () => {
        navigate("/todo?date=" + getDateString(props.date));
    }

    return (
        <div
            className={`side-panel ${props.openPanel ? "open" : ""}`}
            tabIndex={props.openPanel ? 0 : -1}>
            <div className="side-panel-header">
                <h1>{props.date?.toLocaleString("default", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}</h1>
            </div>
            <div className="side-panel-content">
                <div className="side-panel-content-header">
                    <Arrow
                        className="arrow-icon arrow-icon-left"
                        onClick={() => {
                            props.onClick();
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                props.onClick();
                            }
                        }} />
                    <h2>Twoje zadania</h2>
                    <EditButton
                        className="edit-icon"
                        tabIndex={0}
                        onClick={() => {
                            redirectTodo();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                redirectTodo();
                            }
                        }}
                    />
                </div>
                {props.tasks.length > 0 ?
                    <div className="side-panel-list">
                        {props.tasks.map(task => {
                            return (
                                <Task key={task.id} task={task} />
                            );
                        })}
                    </div>
                    :
                    <div className="calendar-no-data-text">
                        <p>Nie dodano jeszcze żadnych zadań do&nbsp;tego dnia. Kliknij na&nbsp;ikonę <EditButton /> w&nbsp;prawym górnym rogu lub przejdź do&nbsp;zakładki ToDo, aby dodać nowe zadania.</p>
                    </div>
                }

            </div>
        </div>
    );
}