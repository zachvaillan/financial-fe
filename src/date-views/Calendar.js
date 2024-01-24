import './calendar.css'

export const Calendar = ({ days, currentDate }) => {

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
  )
}