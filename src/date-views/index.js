import React, { useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { DateTable } from './DateTable';
import { Tabs } from '../components/Tabs';

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
      <Tabs tabArray={['Calendar', 'Date Table']} handleCurrentTab={setCurrentTab} />
      {currentTab === 'Calendar' && <Calendar days={days} currentDate={currentDate} />}
      {currentTab === 'Date Table' && <DateTable />}
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