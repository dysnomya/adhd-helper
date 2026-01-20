import { useState } from "react";

export const getTaskDateName = (dueDate) => {

    if (!dueDate) {
        return "Bez daty";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Dzisiaj";
    }
    
    if (diffDays === 1) {
        return "Jutro"
    }

    return taskDate.toLocaleDateString();

};


export const parseEuropeanDate = (dateString) => {
    if (dateString === "Dzisiaj" || dateString === "Jutro" || dateString === "Bez daty") {
        return new Date(NaN); 
    }

    const parts = dateString.split(new RegExp('[./]')); 

    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        return new Date(year, month - 1, day);
    }
    
    return new Date(NaN);
};

export const timeDisplay = (timeInMinutes) => {
    if (timeInMinutes < 60) {
        const timeString = timeInMinutes + " min";
        return timeString;
    } 

    var hours = parseInt(timeInMinutes / 60);
    var minutes = timeInMinutes - (hours * 60);

    const timeString = hours + " godz " + minutes + " min";
    return timeString;

};

export const NumberInput = ({setTime, ...props}) => {
    const [amount, setAmount] = useState(5); 

    const handleAmountChange = (e) => {
        const val = e.target.value;

        if (val === "") {
            setAmount("");
            return;
        }

        const numVal = parseInt(val, 10);
        if (numVal < 1 || isNaN(numVal)) {
            setAmount(1);
            setTime(1);
        } else {
            setAmount(numVal);
            setTime(numVal);
        }
    };

    const blockInvalidChar = (e) => {
        if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleBlur = () => {
        if (amount === "") {
            setAmount(1);
            setTime(1);
        }
    }

    return (
        <input
            type="number"
            min="1"
            max="1440"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={blockInvalidChar}
            onBlur={handleBlur}
            className="edit-input-time"
            {...props}
        />
    );

};