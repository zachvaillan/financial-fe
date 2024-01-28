import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { Table } from './Table';
import { centsToDollars } from '../utils/centsToDollars';
import { Dialog, DialogContent } from '@mui/material';
import { TransactionForm } from './TransactionForm';

export const Expenses = ({setOpenExpense}) => {
    const { data, fetchData } = useFetcher('/api/v1/expenses');
    const { sendPostRequest } = usePostRequest();
    const [newOpen, setNewOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      amount: '',
      start_date: '',
      recurrence_rule: '',
    });

    useEffect(() => {
      fetchData();
    }, [])

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
      sendPostRequest('/api/v1/expenses', formDataWithCents, 'POST');
      fetchData();
    };

    const handleDelete = (id) => {
      sendPostRequest(`/api/v1/expenses/${id}`, null, 'DELETE');
      fetchData();
    }

    const mappedData = data?.map((expense) => {
      return { ...expense, amount: centsToDollars(expense.amount_cents) }
    });

    const totalAmount = data?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount_cents,
      0,
    );

    return (
        <div>
          <Dialog open={newOpen} onClose={() => setNewOpen(false)}>
            <DialogContent>
              <TransactionForm title="Create Expense" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
          <h1>Expenses</h1>
          <button onClick={() => setNewOpen(true)}>New Expense</button>
          <div>Total: {totalAmount / 100}</div>
          <Table handleOpen={setOpenExpense} handleDelete={handleDelete} rows={mappedData} columns={['Name', 'Amount']} keys={['name', 'amount']} />
        </div>
    )
}