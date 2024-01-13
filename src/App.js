import { useState } from 'react';
import './App.css';
import { Expenses } from './components/Expenses';
import { Incomes } from './components/Incomes';
import { Liabilities } from './components/Liabilities';
import { Assets } from './components/Assets';
import { Calendar } from './calendar';
import { Tabs } from './components/Tabs';

function App() {
  const [currentTab, handleCurrentTab] = useState();

  return (
    <div className="App">
      <div>
        <Tabs handleCurrentTab={handleCurrentTab} />
        {currentTab === 'Assets' && <Assets />}
        {currentTab === 'Liabilities' && <Liabilities />}
        {currentTab === 'Expenses' && <Expenses />}
        {currentTab === 'Incomes' && <Incomes />}
      </div>
      <Calendar />
    </div>
  );
}

export default App;
