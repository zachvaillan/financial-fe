import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { Table } from './Table';
import { centsToDollars } from '../utils/centsToDollars';
import { Dialog, DialogContent } from '@mui/material';
import { TransactionForm } from './TransactionForm';

export const Incomes = () => {
    const { data, fetchData } = useFetcher('/api/v1/incomes');
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
        sendPostRequest('/api/v1/incomes', formDataWithCents, 'POST');
        fetchData();
    };

    const handleDelete = (id) => {
      sendPostRequest(`/api/v1/incomes/${id}`, null, 'DELETE');
      fetchData();
    }

    const mappedData = data?.map((income) => {
      return { ...income, amount: centsToDollars(income.amount_cents) }
    });

    return (
        <div>
          <Dialog open={newOpen} onClose={() => setNewOpen(false)}>
            <DialogContent>
              <TransactionForm title="Create Income" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
          <h1>Incomes</h1>
          <button onClick={() => setNewOpen(true)}>New Income</button>
          <Table handleDelete={handleDelete} rows={mappedData} columns={['Name', 'Amount']} keys={['name', 'amount']} />
        </div>
    )
}