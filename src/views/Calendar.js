import './calendar.css';
import { useCalendar } from '../contexts/CalendarContext';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, Drawer } from '@mui/material';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';
import { AccountForm } from '../components/forms/account-form/AccountForm';
import { centsToDollars } from '../utils/centsToDollars';
import { FormData } from '../constants/CashFlowsTabs';
import { useFetchCashflowParent } from '../hooks/useFetchCashflowParent';
import { useFetchAccount } from '../hooks/useFetchAccount';

export const Calendar = () => {
  const [dateOpen, setDateOpen] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState({});
  const { days, cashFlows, currentDate, calendarArray, accounts, totalAmount } = useCalendar();

  const handleSelectDate = (day) => {
    if (selectedDates.length < 1) setDateOpen(day);
    const selected = [...selectedDates]
    if (selectedDates.includes(day)) {
      const idx = selected.findIndex((selectedDay) => selectedDay === day);
      selected.splice(idx, 1)
    } else {
      selected.push(day)
    }
    setSelectedDates(selected);
  }

  return (
    <div>
      <h2>Calendar</h2>
      <div className="dashboard-view">
        <div className="calendar-grid">
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
            {calendarArray?.map((day, index) => {
              const amountForDate = cashFlows[day] ? centsToDollars(cashFlows[day]?.total_amount) : null;
              return (
                <div 
                  key={index}
                  onClick={() => handleSelectDate(day)}
                  className={
                    `calendar-day ${day === currentDate ? "active" : ''} 
                    ${selectedDates.includes(day) ? 'selected-date' : ''}`
                  }
                >
                  {day}
                  <div>
                    {amountForDate}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="info-wrapper">
          <div className="info-container">
            {/* {Object.keys(negativeBalances).map(key => {
              return(
                <div>
                  You have a negative balance of {negativeBalances[key]} on the {key}th.
                </div>
              )
            })} */}
          </div>
          <div className="info-container">
            {accounts?.liabilities.map((liability) => {
              return(
                <div onClick={() => setAccountDrawerOpen({ item: liability, type: 'Liability' })}>
                  <p>{liability.name}: {centsToDollars(liability.amount_cents)}</p>
                </div>
              )
            })}
            {accounts?.assets.map((asset) => {
              return(
                <div onClick={() => setAccountDrawerOpen({ item: asset, type: 'Asset' })}>
                  <p>{asset.name}: {centsToDollars(asset.amount_cents)}</p>
                </div>
              )
            })}
            <p>Total Net Worth Gain: {centsToDollars(totalAmount)}</p>
          </div>
        </div>
      </div>
      <DateDialog dateOpen={dateOpen} setDateOpen={setDateOpen} setSelectedDates={setSelectedDates} selectedDates={selectedDates}/>
      <AccountDrawer drawerOpen={Boolean(accountDrawerOpen?.item)} handleClose={() => setAccountDrawerOpen()} item={accountDrawerOpen?.item} accountType={accountDrawerOpen?.type} />
    </div>
  )
};

const DateDialog = ({ dateOpen, setDateOpen, setSelectedDates, selectedDates }) => {
  const [drawerOpen, setDrawerOpen] = useState();
  const [selectedItem, setSelectedItem] = useState({});
  const { cashFlows } = useCalendar();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setDateOpen();
  }

  const handleClose = () => {
    setDrawerOpen();
    setSelectedDates([]);
    setDateOpen();
    setSelectedItem();
  }

  const handleSelectItem = (item) => {
    setDrawerOpen(true);
    setSelectedItem(item)
  }

  if (!cashFlows) return null;

  return (
    <>
      <Dialog open={dateOpen} onClose={handleClose}>
        <DialogContent>
            {cashFlows[dateOpen]?.transactions.map(item => {
              return (
                <div onClick={() => handleSelectItem(item)}>
                  <p>{item.name}: {centsToDollars(item.amount_cents)}</p>
                </div>
              )
            })}
            <button onClick={handleDrawerOpen}>Add new</button>
        </DialogContent>
      </Dialog>
      <CashFlowDrawer drawerOpen={drawerOpen} handleClose={handleClose} selectedDates={selectedDates} item={selectedItem} />
    </>
  )
}

const CashFlowDrawer = ({ drawerOpen, handleClose, isPersistent, selectedDates, item }) => {
  const [formData, setFormData] = useState(FormData);
  const { accounts } = useCalendar();
  const { data } = useFetchCashflowParent(item?.cash_flowable_id, item?.cash_flowable_type)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const defaultData = data ? data : formData
    setFormData({...defaultData, type: item?.cash_flowable_type, amount: defaultData.amount_cents / 100, selected_dates: selectedDates })
  }, [selectedDates, data, item])

  return (
    <Drawer
      anchor='right'
      open={drawerOpen}
      onClose={handleClose}
      style={{ zIndex: 1400 }}
      variant={isPersistent ? 'persistent' : 'temporary'}
    >
      <div onClick={handleClose}>Close</div>
      <TransactionForm isEdit={Boolean(item)} accounts={accounts} formData={formData} handleChange={handleChange} selectedDates={selectedDates} />
    </Drawer>
  )
}

const AccountDrawer = ({ drawerOpen, handleClose, item, accountType }) => {
  const [formData, setFormData] = useState(FormData);
  const { accounts } = useCalendar();
  const { data } = useFetchAccount(item?.id, accountType)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const defaultData = data ? data : formData
    setFormData({...defaultData, type: accountType, amount: defaultData.amount_cents / 100 })
  }, [data, item])

  return (
    <Drawer
      anchor='right'
      open={drawerOpen}
      onClose={handleClose}
      style={{ zIndex: 1400 }}
      variant={'temporary'}
    >
      <div onClick={handleClose}>Close</div>
      <AccountForm isEdit={Boolean(item)} accounts={accounts} formData={formData} handleChange={handleChange} />
    </Drawer>
  )
}