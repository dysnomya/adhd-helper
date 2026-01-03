import { useState } from "react";
import "../../styles/calendar.scss";
import SplitCalendarCell from "../Split/SplitCalendarCell";
import CalendarSidePanel from "../Calendar/CalendarSidePanel.js";
import capitalizeFirstLetter from "../../functions/TextFunctions.js";
import { ReactComponent as Arrow } from "../../assets/arrow-right.svg";

export default function SplitCalendar({setOutSelectedDate, tasks, onClickDay}) {
    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openPanel, setOpenPanel] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    console.log(new Date(year, month, 1));      

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastDay = new Date(year, month + 1, 0).getDate();

    const isSameDay = (date1, date2) => {
    // Zabezpieczenie przed null/undefined
    if (!date1 || !date2) return false;

    // Upewniamy się, że pracujemy na obiektach Date (jeśli date1 to string z JSON)
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

    const cells = [];
    for (let i = 0; i < 42; i++) {
        const dayNumber = i - firstDay + 1;
        if (dayNumber < 1 || dayNumber > lastDay) {
            cells.push(null);
        } else {
            cells.push(dayNumber);
        }
    }

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const selectDate = (day) => {
        setSelectedDate(new Date(year, month, day));
        setOutSelectedDate(new Date(year, month, day));
        
    }

    return (
        <div className="split-calendar-page">
            <div className={`calendar overlay ${openPanel ? "open" : ""}`} onClick={() => openPanel && setOpenPanel(false)}>
                <div className="calendar-header">
                    <Arrow
                        className="arrow-icon arrow-icon-left"
                        onClick={goToPreviousMonth}
                        tabIndex={!openPanel ? 0 : -1}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                goToPreviousMonth();
                            }
                        }} />
                    <h2>{capitalizeFirstLetter(currentDate.toLocaleString("default", { month: "long" }))} {year}</h2>
                    <Arrow
                        className="arrow-icon arrow-icon-right"
                        onClick={goToNextMonth}
                        tabIndex={!openPanel ? 0 : -1}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                goToNextMonth();
                            }
                        }} />
                </div>
                <div className="calendar-container">
                    <div className="calendar-days">
                        {days.map((d, index) => (
                            <h4 key={index}>{d}</h4>
                        ))}
                    </div>

                    {cells.map((day, index) => (
                        <SplitCalendarCell
                            key={index}
                            day={day}
                            openPanel={openPanel}
                            onClick={() => selectDate(day)}
                            tasks={tasks.filter(task => isSameDay(task.date, new Date(year, month, day)))}
                        />
                    ))}
                </div>
            </div>
            <CalendarSidePanel openPanel={openPanel} onClick={() => setOpenPanel(false)} date={selectedDate?.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })} />
        </div>
    );
}