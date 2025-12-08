import { useState } from "react";
import "../styles/calendar.scss";
import CalendarCell from "../components/Calendar/CalendarCell";
import CalendarSidePanel from "../components/Calendar/CalendarSidePanel.js";
import capitalizeFirstLetter from "../functions/TextFunctions.js";
import { ReactComponent as Arrow } from "../assets/arrow-right.svg";

export default function Calendar() {
    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openPanel, setOpenPanel] = useState(false);

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
        setSelectedDate(new Date(year, month, day));
    }

    const [categories, setCategories] = useState([]);
    const [tasks, setTasks] = useState([]);

    const getHeaders = () => {
        const token = localStorage.getItem("token");

        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };
    };

    const loadTaskData = (day) => {
        const filters = {
            "day": new Intl.DateTimeFormat('en-CA').format(new Date(year, month, day))
        };

        async function loadData() {
            // Build query parameters from filters object
            const params = new URLSearchParams(filters);

            // Fetch categories
            const catRes = await fetch("/api/categories", {
                headers: getHeaders()
            });
            const categoriesData = await catRes.json();

            // Fetch tasks with filters
            const taskRes = await fetch(`/api/tasks?${params}`, {
                headers: getHeaders()
            });
            const tasksData = await taskRes.json();

            setCategories(categoriesData);
            setTasks(tasksData);
        }

        loadData();
    }

    return (
        <div className="calendar-page">
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
                        <CalendarCell
                            key={index}
                            day={day}
                            openPanel={openPanel}
                            onClick={() => { day && setOpenPanel(true); day && selectDate(day); loadTaskData(day) }}
                        />
                    ))}
                </div>
            </div>
            <CalendarSidePanel openPanel={openPanel} onClick={() => setOpenPanel(false)} date={selectedDate?.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}
                tasks={tasks}
                categories={categories}
            />
        </div>
    );
}