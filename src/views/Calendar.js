import './calendar.css';
import { useCalendar } from '../contexts/CalendarContext';

export const Calendar = () => {
  const { lineItems, days, currentDate } = useCalendar();

  const { amountByDate, negativeBalances } = lineItems; 
  if (!amountByDate) return null;

  return (
    <div className="dashboard-view">
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
              const amountForDate = day ? amountByDate[day] : null;
              return (
                <div key={index} className={`calendar-day ${day === currentDate ? "active" : ''}`}>
                  {day}
                  <div>
                    {amountForDate}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className="negative-balances-container">
        {Object.keys(negativeBalances).map(key => {
          return(
            <div>
              You have a negative balance of {negativeBalances[key]} on the {key}th.
            </div>
          )
        })}
      </div>
    </div>
  )
};
