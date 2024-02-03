import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';

export const Expense = ({id}) => {
  const { data, fetchData } = useFetcher(`/api/v1/expenses/${id}`);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    start_date: '',
    recurrence_rule: '',
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
      <TransactionForm title="Edit Expense" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}