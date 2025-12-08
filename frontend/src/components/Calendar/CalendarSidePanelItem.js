import capitalizeFirstLetter from "../../functions/TextFunctions";

export default function CalendarSidePanelItem(props) {
    return (
        <div className="side-panel-task-item" style={{background: props.task.category?.color}}>
            <div className="side-panel-task-item-header">
                <h3>{props.task.category ? capitalizeFirstLetter(props.task.category.name) : "Bez kategorii"}</h3>
            </div>
            <div className="side-panel-task-item-content">
                <p>{props.task.name}</p>
            </div>
        </div>
    );
}