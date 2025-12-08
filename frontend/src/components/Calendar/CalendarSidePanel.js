import { ReactComponent as Arrow } from "../../assets/arrow-right.svg";
import { ReactComponent as EditButton } from "../../assets/edit-button.svg"
import CalendarSidePanelItem from "./CalendarSidePanelItem";

export default function CalendarSidePanel(props) {
    return (
        <div
            className={`side-panel ${props.openPanel ? "open" : ""}`}
            tabIndex={props.openPanel ? 0 : -1}>
            <div className="side-panel-header">
                <h1>{props.date}</h1>
            </div>
            <div className="side-panel-content">
                <div className="side-panel-content-header">
                    <Arrow
                        className="arrow-icon arrow-icon-left"
                        onClick={props.onClick}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                props.onClick();
                            }
                        }} />
                    <h2>Twoje zadania</h2>
                    <EditButton 
                        className="edit-icon"
                        onClick=""
                        tabIndex={0}
                    />
                </div>
                <div className="side-panel-list">
                    {props.tasks?.map(task => {
                        const color = task.category?.color || "#ccc"; // ugly ahh

                        return (
                            <CalendarSidePanelItem
                                key={task.id}
                                task={task}
                                color={color}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}