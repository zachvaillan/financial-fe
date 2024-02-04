import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';
import { usePostRequest } from '../usePostRequest';

export const Expense = ({id}) => {
  const { data, fetchData } = useFetcher(`/api/v1/expenses/${id}`);
  const { sendPostRequest } = usePostRequest();
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
    sendPostRequest(`/api/v1/expenses/${id}`, formDataWithCents, 'PUT');
    fetchData();
  };

  return (
    <div>
      <TransactionForm title="Edit Expense" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}