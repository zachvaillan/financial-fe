import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { Table } from '../components/tables/Table';
import { centsToDollars } from '../utils/centsToDollars';
import { AccountForm } from '../components/forms/account-form/AccountForm';
import { Dialog, DialogContent } from '@mui/material';

export const Liabilities = ({setOpenLiability}) => {
    const { data, fetchData } = useFetcher('/api/v1/liabilities');
    const { sendPostRequest } = usePostRequest();
    const [newOpen, setNewOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: '',
        interest_rate: '',
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
      sendPostRequest('/api/v1/liabilities', formDataWithCents, 'POST');
      fetchData();
    };

    const handleDelete = (id) => {
      sendPostRequest(`/api/v1/liabilities/${id}`, null, 'DELETE');
      fetchData();
    }

    const mappedData = data?.map((li) => { 
      return { ...li, amount: centsToDollars(li.amount_cents) }
    })
    
    const totalAmount = data?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount_cents,
      0,
    );
    
    return (
        <div>
            <Dialog open={newOpen} onClose={() => setNewOpen(false)}>
              <DialogContent>
                <AccountForm title="Create Liability" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
              </DialogContent>
            </Dialog>
            <h1>Liabilities</h1>
            <button onClick={() => setNewOpen(true)}>New Liability</button>
            <div>Total: {totalAmount / 100}</div>
            <Table handleOpen={setOpenLiability} handleDelete={handleDelete} rows={mappedData} columns={['Name', 'Amount', 'Rate']} keys={['name', 'amount', 'interest_rate']} />
        </div>
    )
}