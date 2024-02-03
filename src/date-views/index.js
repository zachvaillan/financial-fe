import React, { useState, useEffect, useMemo } from 'react';
import { Calendar } from './Calendar';
import { DateTable } from './DateTable';
import { Tabs } from '../components/Tabs';
import { centsToDollars } from '../utils/centsToDollars';
import { useFetcher } from '../useFetcher';

export const DateViews = () => {
  const [currentTab, setCurrentTab] = useState();

  const date = new Date()
  const currentDate = date.getDate();
  const daysCount = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const days = Array.from({ length: daysCount }, (_, index) => index + 1);
  const pushedDays = Array.from({ length: firstDay - 1 });
  days.unshift(...pushedDays)

  const { data, fetchData } = useFetcher('/api/v1/calendar')

  useEffect(() => {
    fetchData();
  }, []);

  const normalizeDates = (occurrence_date) => {
    const date = new Date(occurrence_date);
    const dayOfMonth = date.getDate();

    return dayOfMonth;
  }

  const lineItems = useMemo(() => {
    if (!data) return [];

    return data.map((cashFlow) => {
      return {...cashFlow, dollars: centsToDollars(cashFlow.amount.cents), date: normalizeDates(cashFlow.occurence_date)}
    })
  }, [data])

  return (
    <div>
      <Tabs tabArray={['Calendar', 'Date Table']} handleCurrentTab={setCurrentTab} />
      {currentTab === 'Calendar' && <Calendar lineItems={lineItems} days={days} currentDate={currentDate} />}
      {currentTab === 'Date Table' && <DateTable lineItems={lineItems} />}
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