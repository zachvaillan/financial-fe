import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { DateTable } from './DateTable';
import { Tabs } from '../components/tabs/Tabs';
import { CalendarProvider } from '../contexts/CalendarContext';

export const DateViews = () => {
  const [currentTab, setCurrentTab] = useState();

  const date = new Date()
  const currentDate = date.getDate();
  const daysCount = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const days = Array.from({ length: daysCount }, (_, index) => index + 1);
  const pushedDays = Array.from({ length: firstDay - 1 });
  days.unshift(...pushedDays)

  return (
    <div>
      <CalendarProvider>
        <Tabs tabArray={['Calendar', 'Date Table']} handleCurrentTab={setCurrentTab} />
        {currentTab === 'Calendar' && <Calendar days={days} currentDate={currentDate} />}
        {currentTab === 'Date Table' && <DateTable />}
      </CalendarProvider>
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