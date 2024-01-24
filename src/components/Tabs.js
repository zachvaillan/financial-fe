import './Tabs.css';

export const Tabs = ({ tabArray, handleCurrentTab }) => {
  return(
    <div className="tabs">
      {tabArray.map((tab) => {
        return <div style={{cursor: "pointer", marginRight: "30px"}} onClick={() => handleCurrentTab(tab)}>{tab}</div>
      })}
    </div>
  )
}