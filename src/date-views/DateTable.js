import './calendar.css';
import { Table } from '../components/tables/Table';

export const DateTable = ({ lineItems }) => {

  return (
    <div>
      <Table columns={['Date', 'Name', 'Amount', 'Total']} rows={lineItems} keys={['date', 'name', 'dollars']} />
    </div>
  )
}