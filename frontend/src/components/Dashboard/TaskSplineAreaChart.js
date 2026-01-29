import React, { useMemo } from 'react';
import "../../styles/dashboard.scss";

const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};

const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.2;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
};

const bezierCommand = (point, i, a) => {
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
    const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

const svgPath = (points, command) => {
    const d = points.reduce((acc, point, i, a) => 
        i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`, 
    "");
    return d;
};

const TaskSplineAreaChart = ({ data = [] }) => {

    const gradientId = useMemo(() => `chart-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    console.log("CHART DATA")
    console.log(data)

    const chartData = data.length > 0 ? data : [{ date: '', count: 0 }, { date: '', count: 0 }];

    const width = 300;
    const height = 150;
    const padding = 10;
    const chartHeight = height - padding * 2;
    const chartWidth = width;

    const maxY = Math.max(...chartData.map(d => d.count), 1);
    const points = chartData.map((val, index) => {
        const x = (index / (chartData.length - 1)) * chartWidth;
        const y = chartHeight - (val.count / maxY) * chartHeight + padding;
        return [x, y];
    });

    const linePath = svgPath(points, bezierCommand);
    const fillPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return `${d.getDate()}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    return (
        <div className="chart-card">
            <h3 className="chart-title">Aktywność (Ostatnie 30 dni)</h3>
            
            <div className="chart-wrapper">
                <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-accent)" />
                            <stop offset="100%" stopColor="var(--color-accent-hover)" />
                        </linearGradient>
                    </defs>

                    <path 
                        d={fillPath} 
                        fill={`url(#${gradientId})`} 
                        stroke="none" 
                    />

                    <path 
                        d={linePath} 
                        fill="none" 
                        stroke="var(--color-accent-hover)"
                        strokeWidth="3" 
                        strokeLinecap="round"
                    />

                    <g className="chart-axis-labels">
                        {[0, 10, 20, 29].map((index) => {
                            const x = (index / (chartData.length - 1)) * width;
                            const dateObj = chartData[index];
                            
                            if (!dateObj) return null;

                            return (
                                <g key={index}>
                                    <line 
                                        x1={x} y1={height - 15} 
                                        x2={x} y2={height - 10} 
                                        stroke="var(--color-text)"
                                        strokeWidth="1" 
                                    />
                                    <text 
                                        x={x} 
                                        y={height} 
                                        textAnchor={index === 0 ? "start" : index === 29 ? "end" : "middle"}
                                    >
                                        {formatDate(dateObj.date)}
                                    </text>
                                </g>
                            );
                        })}
                    </g>

                    <g className="chart-axis-labels">
                        <text x="0" y={maxY}>- {maxY}</text>
                    </g>

                </svg>
            </div>
        </div>
    );
};

export default TaskSplineAreaChart;