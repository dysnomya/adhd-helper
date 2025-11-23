import React, { useState } from "react";
import "../styles/calendar.scss";
import CalendarCell from "../components/CalendarCell";

export default function Calendar() {
    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [_, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastDay = new Date(year, month + 1, 0).getDate();

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
        setSelectedDate(`${year}-${month + 1}-${day}`);
        console.log(`${year}-${month + 1}-${day}`);
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2 style={{ margin: "auto" }}>
                    <button className="calendar-button" onClick={goToPreviousMonth}>&lt;</button>
                    {currentDate.toLocaleString("default", { month: "long" })} {year}
                    <button className="calendar-button" onClick={goToNextMonth}>&gt;</button>
                </h2>

            </div>
            <div className="calendar-container">
                <div className="calendar-days">
                    {days.map((d, index) => (
                        <div key={index} style={{ fontWeight: "bold", textAlign: "center" }}>{d}</div>
                    ))}
                </div>

                {cells.map((day, index) => (
                    <CalendarCell index={index} day={day} selectDate={selectDate} />
                ))}
            </div>
        </div>
    );
}