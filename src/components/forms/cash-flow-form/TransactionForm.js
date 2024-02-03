import '../form.css';
import { useFetchLabels } from '../../../useFetchLabels';

export const TransactionForm = ({ title, formData, handleSubmit, handleChange }) => {
  const { data: labels } = useFetchLabels();

  return (
    <form className="Assets" onSubmit={handleSubmit}>
      <h3>{title}</h3>
      <div>
          <label>Name:</label>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
          />
      </div>
      <div>
          <label>Description:</label>
          <input
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
          />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
      </div>
      <div>
        <label>Frequency</label>
        <select name="recurrence_rule">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <label>Label</label>
        <select name="label">
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