import logo from './logo.svg';
import './App.css';
import { Expenses } from './components/Expenses';
import { Incomes } from './components/Incomes';
import { Liabilities } from './components/Liabilities';
import { Assets } from './components/Assets';
import { Calendar } from './calendar';

function App() {
  return (
    <div className="App">
      {/* <Expenses />
      <Incomes /> */}
      <Assets />
      <Liabilities />
      <Calendar />
    </div>
  );
}

export default App;
