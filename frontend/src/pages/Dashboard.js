import "../styles/dashboard.scss";
import DailyProgress from "../components/Todo/DailyProgress";
import { useTaskData } from "../hooks/UseTaskData";
import { ReactComponent as SadPimpus } from "../assets/pimpus_sad.svg";
import { useEffect, useMemo, useState } from "react";
import TaskProgressGaugeChart from "../components/Dashboard/TaskProgressGaugeChart";
import TaskSplineAreaChart from "../components/Dashboard/TaskSplineAreaChart";
import DateComponent from "../components/Dashboard/DateComponent";
import UpcomingTasks from "../components/Dashboard/UpcomingTasks";

import { ReactComponent as Glut } from "../assets/dashboard-glut.svg";
import pimpus from "../assets/pimpus_happy_anim.webp";

import { fetchUserInfo } from "../api/UserApi";

export default function Dashboard() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserInfo();
                if (data && data.name) {
                    setUserName(data.name);
                }
            } catch (error) {
                console.error("Błąd pobierania użytkownika: ", error);
            }
        };
        getUserData();
    });

    const emptyFilters = useMemo(() => [], []);
    const { tasks, categories, isLoading, error } = useTaskData(emptyFilters, "", true);

    const stats = useMemo(() => {
        if (!tasks || tasks.length === 0) return null;

        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const notCompleted = total - completed;
        
        const highPriority = tasks.filter(t => t.priority === 'HIGH').length;

        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            total,
            completed,
            notCompleted,
            highPriority,
            percentage
        };
    }, [tasks]);

    const chartData = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        const last30Days = new Array(30).fill(0).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toISOString().split('T')[0];
        });

        const dataMap = {};
        last30Days.forEach(date => dataMap[date] = 0);

        tasks.forEach(task => {
            if (task.completed && task.day) {
                if (dataMap[task.day] !== undefined) {
                    dataMap[task.day]++;
                }
            }
        });

        return last30Days.map(date => dataMap[date]);
    }, [tasks]);

    if (error) return (
        <div className="server-data-error-main">
            <div className="server-data-error">
                <SadPimpus className="sad-pimpus"></SadPimpus>
                <p className="blad-serwera">Błąd połączenia z serwerem</p>
                <p>Coś poszło nie tak. Sprawdź połączenie z internetem.</p>
            </div>
        </div>
    );

    const isFirstLoad = isLoading && tasks.length === 0 && categories.length === 0;

    const percentage = stats ? stats.percentage : 0;

    const getTodayDateString = () => new Date().toISOString().split('T')[0];
    const statsDate = getTodayDateString();

    return (
        <div className='dashboard-main-container'>

            {isLoading && (
                <div className={`loading-overlay ${isFirstLoad ? 'initial-load' : ''}`}>
                    <div className="spinner"></div>
                </div>
            )}

            <Glut className="dashboard-glut"/>

            <div className="dashboard-left">
                <div className="dashboard-left-top">
                    <DailyProgress 
                        date={statsDate}
                    />
                </div>

                <div className="dashboard-left-middle">

                    <TaskProgressGaugeChart percentage={percentage} />

                    <TaskSplineAreaChart data={chartData}/>

                </div>

                <div className="dashboard-left-bottom">
                    <div className="dashboard-calendar-container">
                        <DateComponent />
                    </div>
                </div>

            </div>

            <div className="dashboard-right">
                <div className="dashboard-right-top">
                    <div className="dashboard-pimpek-text">
                        <p>Cześć {userName}!</p>
                    </div>
                    <div className="dashboard-pimpek">

                        <div className="dashboard-pimpek-floor">

                        </div>
                        
                        <img 
                            src={pimpus} 
                            alt="Happy Pimpus" 
                            className="dashboard-pimpus"
                        />

                        
                    </div>
                </div>
                <div className="dashboard-right-bottom">
                    <UpcomingTasks tasks={tasks}/>
                </div>
            </div>
        </div>
    );
}