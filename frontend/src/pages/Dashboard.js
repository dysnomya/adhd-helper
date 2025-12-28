import "../styles/dashboard.scss";
import DailyProgress from "../components/Todo/DailyProgress";
import { useTaskData } from "../hooks/UseTaskData";
import { ReactComponent as SadPimpus } from "../assets/pimpus_sad.svg";
import { useMemo } from "react";
import TaskProgressGaugeChart from "../components/Dashboard/TaskProgressGaugeChart"

export default function Dashboard() {

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

    return (
        <div className='dashboard-main-container'>

            {isLoading && (
                <div className={`loading-overlay ${isFirstLoad ? 'initial-load' : ''}`}>
                    <div className="spinner"></div>
                </div>
            )}

            <div className="dashboard-left">
                <div className="dashboard-left-top">
                    <DailyProgress 
                    />
                </div>

                <div className="dashboard-left-middle">

                    <div className="dashboard-percentage-of-done-tasks">
                        <TaskProgressGaugeChart percentage={percentage} />
                    </div>

                </div>

                <div className="dashboard-left-bottom">

                </div>

            </div>

            <div className="dashboard-right">
                <div className="dashboard-right-top">
                
                </div>
                <div className="dashboard-right-bottom">
                
                </div>
            </div>
        </div>
    );
}