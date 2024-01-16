import './AccountForm.css';

export const TransactionForm = ({ title, formData, handleSubmit, handleChange }) => {
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
          name="amount_cents"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" name="end_date" value={formData.end_date}  onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}