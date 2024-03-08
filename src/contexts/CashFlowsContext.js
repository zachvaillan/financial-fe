import React, { createContext, useContext, useState, useMemo } from 'react';
import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { centsToDollars } from '../utils/centsToDollars';
import { Dialog, DialogContent } from '@mui/material';
import { CashFlowsTabs, FormData } from '../constants/CashFlowsTabs';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';

const CashFlowsContext = createContext();

export function useCashFlows() {
  return useContext(CashFlowsContext);
}

export const CashFlowsProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('Expenses');
  const [itemOpen, setItemOpen] = useState();
  const [formData, setFormData] = useState(FormData);
  const { data, fetchData } = useFetcher();
  const { data: singleData, fetchData: fetchSingleData } = useFetcher();
  const { sendPostRequest } = usePostRequest();

  useEffect(() => {
    fetchData(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}`);
  }, [currentTab, itemOpen])

  useEffect(() => {
    if (itemOpen) {
      fetchSingleData(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}/${itemOpen}`);
    }
  }, [itemOpen])

  useEffect(() => {
    if (singleData) {
      const amount_cents = singleData.amount_cents;
      delete singleData.amount_cents;
      setFormData({...singleData, amount: amount_cents / 100});
    }
  }, [singleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
    sendPostRequest(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}`, formDataWithCents, 'POST');
    fetchData();
  };

  const handleDelete = (id) => {
    sendPostRequest(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}/${id}`, null, 'DELETE');
    fetchData();
  }

  const mappedData = data?.map((li) => { 
    return { ...li, amount: centsToDollars(li.amount_cents) }
  })

  const totalAmount = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount_cents,
    0,
  );

  const handleClose = () => {
    setItemOpen(false);
    setFormData(CashFlowsTabs[currentTab].formData)
  }

  const context = useMemo(() => {
    return({
      mappedData,
      totalAmount,
      setItemOpen,
      currentTab,
      handleDelete,
      setCurrentTab
    })
  }, [
    mappedData,
    totalAmount,
    setItemOpen,
    currentTab,
    handleDelete,
    setCurrentTab
  ])

  return (
    <CashFlowsContext.Provider value={context}>
      <Dialog open={itemOpen} onClose={handleClose}>
        <DialogContent>
          <TransactionForm
            title={`Create ${CashFlowsTabs[currentTab].titleSingle}`}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
      {children}
    </CashFlowsContext.Provider>
  )
}
