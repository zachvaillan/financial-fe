import './Tabs.css';

export const Tabs = ({ handleCurrentTab }) => {
  return(
    <div className="tabs">
      {['Assets', 'Liabilities', 'Incomes', 'Expenses'].map((tab) => {
        return <div style={{cursor: "pointer", marginRight: "30px"}} onClick={() => handleCurrentTab(tab)}>{tab}</div>
      })}
    </div>
  )
}