import { ReactComponent as Arrow } from "../assets/arrow-right.svg";

export default function CalendarSidePanel(props) {
    return (
        <div className={`side-panel ${props.openPanel ? "open" : ""}`}>
            <div className="side-panel-header">
                <h1>{props.date}</h1>
            </div>
            <div className="side-panel-content">
                <div className="side-panel-content-header">
                    <Arrow className="arrow-icon arrow-icon-left" onClick={props.onClick} />
                    <h2>Twoje zadania</h2>
                    <button className="edit-icon">Placeholder</button>
                </div>
            </div>
        </div>
    );
}