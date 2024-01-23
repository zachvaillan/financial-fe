import { useState } from 'react';
import './App.css';
import { Expenses } from './components/Expenses';
import { Incomes } from './components/Incomes';
import { Liabilities } from './components/Liabilities';
import { Assets } from './components/Assets';
import { Calendar } from './calendar';
import { Tabs } from './components/Tabs';
import { Liability } from './components/Liability';

function App() {
  const [currentTab, handleCurrentTab] = useState();
  const [openLiability, setOpenLiability] = useState();

  return (
    <div className="App">
      <div className="info">
        <Tabs handleCurrentTab={handleCurrentTab} />
        {currentTab === 'Assets' && <Assets />}
        {currentTab === 'Liabilities' && <Liabilities setOpenLiability={setOpenLiability} />}
        {currentTab === 'Expenses' && <Expenses />}
        {currentTab === 'Incomes' && <Incomes />}
      </div>
      <Calendar />
      {openLiability && <Liability id={openLiability} />}
    </div>
  );
}

export default App;
