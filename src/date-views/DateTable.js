import './calendar.css';
import { Table } from '../components/tables/Table';
import { useCalendar } from '../contexts/CalendarContext';

export const DateTable = () => {
  const { lineItems } = useCalendar();

  return (
    <div>
      <Table columns={['Date', 'Name', 'Amount', 'Total']} rows={lineItems} keys={['date', 'name', 'dollars']} />
    </div>
  )
}