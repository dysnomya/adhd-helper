import React, { useMemo } from 'react';
import "../../styles/dashboard.scss"; 

const TaskProgressGaugeChart = ({ percentage }) => {
const gradientId = useMemo(() => `gauge-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const size = 200;
    const strokeWidth = 20;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const gapDegrees = 80; 
    const visibleDegrees = 360 - gapDegrees;
    const visiblePercent = visibleDegrees / 360;

    const trackLength = circumference * visiblePercent;
    const safePercentage = Math.min(Math.max(percentage, 0), 100);
    const progressLength = (safePercentage / 100) * trackLength;

    return (
        <div className="gauge-container">
            <h3 className="gauge-title">Procent wykonanych zadań</h3>
            
            <div className="gauge-chart-wrapper">
                <svg 
                    viewBox={`0 0 ${size} ${size}`}
                    className="gauge-svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-accent)" />
                            <stop offset="100%" stopColor="var(--color-accent-hover)" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${trackLength} ${circumference}`}
                        transform={`rotate(${90 + (gapDegrees / 2)} ${center} ${center})`}
                    />

                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${progressLength} ${circumference}`} 
                        strokeDashoffset="0"
                        transform={`rotate(${90 + (gapDegrees / 2)} ${center} ${center})`}
                        className="gauge-progress-circle"
                    />
                </svg>

                <div className="gauge-text-content">
                    <span className="gauge-percentage-text">{percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default TaskProgressGaugeChart;