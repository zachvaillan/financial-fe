import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { TransactionForm } from './TransactionForm';

export const Income = () => {
  const { data, fetchData } = useFetcher(`/api/v1/incomes/${id}`);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    interest_rate: '',
  });

  useEffect(() => {
    fetchData();
  }, [id])

  useEffect(() => {
    data && setFormData(data);
  }, [data])

  const handleChange = () => null;
  const handleSubmit = () => null;

  return (
    <div>
      <TransactionForm title="Edit Income" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}