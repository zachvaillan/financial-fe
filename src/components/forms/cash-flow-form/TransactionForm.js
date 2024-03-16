import './transaction-form.css';
import { useLabels } from '../../../contexts/LabelsContext';
import { usePostRequest } from '../../../usePostRequest';
import { useState, useEffect, useCallback } from 'react';

export const TransactionForm = ({ handleChange, formData, selectedDates, accounts, isEdit }) => {
  const [isExpense, setIsExpense] = useState();
  const { sendPostRequest } = usePostRequest();

  console.log(formData)
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
    if (isEdit) {
      sendPostRequest(`/api/v1/cashflow_parents/${formData.id}`, formDataWithCents, 'PUT');
    } else {
      sendPostRequest(`/api/v1/cashflow_parents`, formDataWithCents, 'POST');
    }
    // fetchData();
  }, [formData, isExpense, isEdit]);

  useEffect(() => {
    if(formData.type === "Expense") setIsExpense(true)
  }, [formData])

  return (
    <div className="root">
      <h3 className="title">New {isExpense ? 'Expense' : 'Income'}</h3>
      {!isEdit && 
        <div>
          <button type="button" onClick={() => setIsExpense()}>Income</button>
          <button type="button" onClick={() => setIsExpense(true)}>Expense</button>
        </div>
      }
      <FormContent 
        isExpense={isExpense}
        formData={formData}
        handleChange={handleChange}
        selectedDates={selectedDates}
        accounts={accounts}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

const FormContent = ({ isExpense, formData, handleChange, selectedDates, accounts, handleSubmit }) => {
  const { labels } = useLabels();

  return (
    <form onSubmit={handleSubmit}>
      {isExpense ? 
      (<>
        <div>
          Does this go towards a current debt?
        </div>
        <div className="input">
          <select value={formData.liability_id} onChange={handleChange} name="liability_id">
            <option value={null}>None selected</option>
            {accounts?.liabilities?.map((liability) => {
              return (
                <option value={liability.id}>{liability.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          What account does this come from?
        </div>
        <div className="input">
          <select value={formData.asset_id} onChange={handleChange} name="asset_id">
            <option value={null}>None selected</option>
            {accounts?.assets?.map((asset) => {
              return (
                <option value={asset.id}>{asset.name}</option>
              )
            })}
          </select>
        </div>
      </>)
      :
      (
        <>
          <div>
            Where is this deposited?
          </div>
          <div className="input">
            <select value={formData.asset_id} onChange={handleChange} name="asset_id">
              <option value={null}>None selected</option>
              {accounts?.assets?.map((asset) => {
                return (
                  <option value={asset.id}>{asset.name}</option>
                )
              })}
            </select>
          </div>
        </>
      )}
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
        <label>Dates</label>
        {selectedDates.map((date) => {
          return(
            <div>
              {date}
            </div>
          )
        })}
        {/* {singleDate && <button type="button" onClick={() => setSingleDate(false)}>Select more dates</button>} */}
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