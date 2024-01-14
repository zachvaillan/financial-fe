import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { Table } from './Table';
import { centsToDollars } from '../utils/centsToDollars';
import { Dialog, DialogContent } from '@mui/material';
import { AccountForm } from './AccountForm';

export const Assets = () => {
    const { data, fetchData } = useFetcher('/api/v1/assets');
    const { sendPostRequest } = usePostRequest();
    const [newOpen, setNewOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount_cents: '',
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
        sendPostRequest('/api/v1/assets', formDataWithCents, 'POST');
        fetchData();
    };

    const handleDelete = (id) => {
      sendPostRequest(`/api/v1/assets/${id}`, null, 'DELETE');
      fetchData();
    }

    const mappedData = data?.map((asset) => {
      return { ...asset, amount: centsToDollars(asset.amount_cents) }
    });

    return (
        <div>
          <Dialog open={newOpen} onClose={() => setNewOpen(false)}>
            <DialogContent>
              <AccountForm title="Create Asset" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
          <h1>Assets</h1>
          <button onClick={() => setNewOpen(true)}>New Asset</button>
          <Table handleDelete={handleDelete} rows={mappedData} columns={['Name', 'Amount', 'Rate']} keys={['name', 'amount', 'interest_rate']} />
        </div>
    )
}