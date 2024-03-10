import './transaction-form.css';
import { useLabels } from '../../../contexts/LabelsContext';
import { FormData } from '../../../constants/CashFlowsTabs';
import { usePostRequest } from '../../../usePostRequest';
import { useState, useEffect } from 'react';

export const TransactionForm = ({ singleDate, setSingleDate, selectedDates }) => {
  const [formData, setFormData] = useState(FormData);
  const [isExpense, setIsExpense] = useState();
  const { sendPostRequest } = usePostRequest();
  const { labels } = useLabels();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    setFormData({...formData, selected_dates: selectedDates })
  }, [selectedDates])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
    sendPostRequest(`/api/v1/${isExpense ? 'expenses' : 'incomes'}`, formDataWithCents, 'POST');
    // fetchData();
  };

  return (
    <form className="root" onSubmit={handleSubmit}>
      <h3 className="title">New {isExpense ? 'Expense' : 'Income'}</h3>
      <div>
        <button type="button" onClick={() => setIsExpense()}>Income</button>
        <button type="button" onClick={() => setIsExpense(true)}>Expense</button>
      </div>
      <div className="input">
          <label>Name:</label>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
          />
      </div>
      <div className="input">
          <label>Description:</label>
          <input
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
          />
      </div>
      <div className="input">
        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div className="input">
        <label>Date{!singleDate && 's'}</label>
        {selectedDates.map((date) => {
          return(
            <div>
              {date}
            </div>
          )
        })}
        {singleDate && <button type="button" onClick={() => setSingleDate(false)}>Select more dates</button>}
      </div>
      <div className="input">
        <label>Frequency</label>
        <select value={formData.recurrence_rule} onChange={handleChange} name="recurrence_rule">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="input">
        <label>Label</label>
        <select onChange={handleChange} name="label">
          {labels?.map(label => {
            return(
              <option value={label.id}>{label.name}</option>
            )
          })}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}