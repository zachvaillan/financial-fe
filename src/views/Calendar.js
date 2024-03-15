import './calendar.css';
import { useCalendar } from '../contexts/CalendarContext';
import { useState } from 'react';
import { Dialog, DialogContent, Drawer } from '@mui/material';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';
import { centsToDollars } from '../utils/centsToDollars';

export const Calendar = () => {
  const [dateOpen, setDateOpen] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const { days, cashFlows, currentDate, calendarArray } = useCalendar();
  console.log(calendarArray)

  const handleSelectDate = (day) => {
    if (selectedDates.length < 1) setDateOpen(day);
    const selected = [...selectedDates]
    if (selectedDates.includes(day)) {
      const idx = selected.findIndex((selectedDay) => selectedDay === day);
      selected.splice(idx, 1)
    } else {
      selected.push(day)
    }
    setSelectedDates(selected);
  }

  return (
    <div>
      <h2>Calendar</h2>
      <div className="dashboard-view">
        <div className="calendar-grid">
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
            {calendarArray?.map((day, index) => {
              const amountForDate = cashFlows[day] ? centsToDollars(cashFlows[day]?.total_amount) : null;
              return (
                <div 
                  key={index}
                  onClick={() => handleSelectDate(day)}
                  className={
                    `calendar-day ${day === currentDate ? "active" : ''} 
                    ${selectedDates.includes(day) ? 'selected-date' : ''}`
                  }
                >
                  {day}
                  <div>
                    {amountForDate}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="info-wrapper">
          <div className="info-container">
            {/* {Object.keys(negativeBalances).map(key => {
              return(
                <div>
                  You have a negative balance of {negativeBalances[key]} on the {key}th.
                </div>
              )
            })} */}
          </div>
          <div className="info-container">
            {/* {assets.map((asset) => {
              return(
                <p>{asset.name}: {asset.dollars}</p>
              )
            })} */}
          </div>
        </div>
      </div>
      {/* <DateDialog dateOpen={dateOpen} setDateOpen={setDateOpen} itemsByDate={itemsByDate} setSelectedDates={setSelectedDates} selectedDates={selectedDates}/> */}
    </div>
  )
};

const DateDialog = ({ dateOpen, setDateOpen, itemsByDate, setSelectedDates, selectedDates }) => {
  const [drawerOpen, setDrawerOpen] = useState();
  const [singleDate, setSingleDate] = useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setDateOpen();
  }

  const handleClose = () => {
    setDrawerOpen();
    setSelectedDates([]);
    setDateOpen();
    setSingleDate(true);
  }

  console.log(itemsByDate)
  return (
    <>
      <Dialog open={dateOpen} onClose={handleClose}>
        <DialogContent>
            {itemsByDate[dateOpen]?.map(item => {
              return (
                <p>{item.name}: {item.dollars}</p>
              )
            })}
            <button onClick={handleDrawerOpen}>Add new</button>
        </DialogContent>
      </Dialog>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={handleClose}
        style={{ zIndex: 1400 }}
        variant={singleDate ? 'temporary' : 'persistent'}
      >
        <div onClick={handleClose}>Close</div>
        <TransactionForm singleDate={singleDate} setSingleDate={setSingleDate} selectedDates={selectedDates} />
      </Drawer>
    </>
  )
}
