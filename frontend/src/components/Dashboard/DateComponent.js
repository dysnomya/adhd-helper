import React, { useMemo } from 'react';
import "../../styles/dashboard.scss";

const DateComponent = () => {

    const today = new Date();
    console.log(today)

    const datesToShow = useMemo(() => {
        const days = [];
        const baseDate = new Date();
        
        for(let i = -1; i <= 2; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            days.push(date);
        }
        return days;
    }, []);

    const toISODate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const formatDisplayDate = (date) => {
        const day = date.getDate();
        const year = date.getFullYear();
        let month = date.toLocaleString('pl-PL', { month: 'short' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        
        return `${day} ${month} ${year}`;
    };

    return (
        <div className='dashboard-date-component-container'>
            {datesToShow.map((date) => {

                const isToday = toISODate(date) === toISODate(today);

                return (
                    <div
                        key={toISODate(date)}
                        className={`dashboard-date-card ${isToday ? 'today' : ''}`}
                    >
                        <div className='dashboard-date-card-header'>
                            {formatDisplayDate(date)}
                        </div>

                        <div className='dashboard-date-card-body'>

                        </div>

                    </div>  
                );
            })}
        </div>
    );
}

export default DateComponent;