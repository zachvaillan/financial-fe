import { useEffect, useState } from 'react';
import './calendar.css';

export const Calendar = ({ days, currentDate, lineItems }) => {
  
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
          {days?.map((day, index) => {
            const dayLineItems = lineItems.filter(li => li.date === day)
            return (
              <div key={index} className={`calendar-day ${day === currentDate ? "active" : ''}`}>
                {day}
                {dayLineItems.map((dli) => {
                  return (
                    <div>{dli.name}</div>
                  )
                })}
              </div>
            )
          })}
      </div>
    </div>
  )
}