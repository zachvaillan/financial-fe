import React, { useState, useEffect } from 'react';
import './calendar.css'
import { useFetcher } from '../useFetcher';

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { data, fetchData } = useFetcher('/api/v1/calendar')
    const date = new Date()

    useEffect(() => {
      fetchData();
    }, []);

    const daysCount = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = Array.from({ length: daysCount }, (_, index) => index + 1);
    const pushedDays = Array.from({ length: firstDay - 1 });
    days.unshift(...pushedDays)
    const currentDate = date.getDate();

    return (
        <div>
            <h2>Calendar</h2>
            <div className="calendar-grid">
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
                <div>Sunday</div>
                {days?.map((day, index) => (
                    <div key={index} className={`calendar-day ${day === currentDate ? "active" : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay;
};

const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};