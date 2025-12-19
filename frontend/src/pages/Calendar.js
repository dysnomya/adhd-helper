import { useState, useEffect } from "react";
import "../styles/calendar.scss";
import CalendarCell from "../components/Calendar/CalendarCell";
import CalendarSidePanel from "../components/Calendar/CalendarSidePanel.js";
import capitalizeFirstLetter from "../functions/TextFunctions.js";
import { ReactComponent as Arrow } from "../assets/arrow-right.svg";
import { fetchTaskDataForTimePeriod } from "../api/TaskApi.js";

export default function Calendar() {
    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openPanel, setOpenPanel] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [tasksForDay, setTasksForDay] = useState([]);

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

    useEffect(() => {
        const loadTaskData = async () => {
            const data = await fetchTaskDataForTimePeriod(new Date(year, month, 1), new Date(year, month + 1, 0));
            setTasks(data);
        };

        loadTaskData();
    }, [year, month]);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const selectDate = (day) => {
        setSelectedDate(new Date(year, month, day));
    }

    const setTaskDataForDay = (day) => {
        setTasksForDay(tasks.filter(t => 
            t.day === new Intl.DateTimeFormat('en-CA').format(new Date(year, month, day))
        ));
    }

    const getTaskNumberByPriority = (day) => {
        const tasksForDay = tasks.filter(t => 
            t.day === new Intl.DateTimeFormat('en-CA').format(new Date(year, month, day))
        );
        const tasksLowCount = tasksForDay.filter(t => t.priority === "LOW").length;
        const tasksMediumCount = tasksForDay.filter(t => t.priority === "MEDIUM").length;
        const tasksHighCount = tasksForDay.filter(t => t.priority === "HIGH").length;
        return [
            tasksLowCount,
            tasksMediumCount,
            tasksHighCount
        ];
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
                            taskCounts={getTaskNumberByPriority(day)}
                            onClick={() => { day && setOpenPanel(true); day && selectDate(day); setTaskDataForDay(day) }}
                        />
                    ))}
                </div>
            </div>
            <CalendarSidePanel openPanel={openPanel} onClick={() => setOpenPanel(false)} date={selectedDate?.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}
                tasks={tasksForDay}
            />
        </div>
    );
}