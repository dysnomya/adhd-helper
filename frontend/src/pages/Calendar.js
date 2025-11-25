import React, { useState } from "react";
import "../styles/calendar.scss";
import CalendarCell from "../components/CalendarCell";
import capitalizeFirstLetter from "../functions/TextFunctions.js";
import { ReactComponent as Arrow } from "../assets/arrow-right.svg";

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
                <Arrow className="arrow-icon arrow-icon-left" onClick={goToPreviousMonth} />
                <h2>{capitalizeFirstLetter(currentDate.toLocaleString("default", { month: "long" }))} {year}</h2>
                <Arrow className="arrow-icon arrow-icon-right" onClick={goToNextMonth} />
            </div>
            <div className="calendar-container">
                <div className="calendar-days">
                    {days.map((d, index) => (
                        <div key={index}>{d}</div>
                    ))}
                </div>

                {cells.map((day, index) => (
                    <CalendarCell index={index} day={day} selectDate={selectDate} />
                ))}
            </div>
        </div>
    );
}