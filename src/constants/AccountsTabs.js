const FormData = {
  transaction: {
    name: '',
    email: '',
    amount: '',
    start_date: '',
    recurrence_rule: '',
  },
  account: {
    name: '',
    email: '',
    amount: '',
    start_date: '',
    recurrence_rule: '',
  }
}

export const AccountsTabs = {
  Expenses: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/expense',
    urlPlural: '/expenses',
    titleSingle: 'Expense',
    titlePlural: 'Expenses',
    formData: FormData.transaction
  },
  Incomes: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/income',
    urlPlural: '/incomes',
    titleSingle: 'Income',
    titlePlural: 'Incomes',
    formData: FormData.transaction
  },
  Assets: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/asset',
    urlPlural: '/assets',
    titleSingle: 'Asset',
    titlePlural: 'Assets',
    formData: FormData.account
  },
  Liabilities: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/liability',
    urlPlural: '/liabilities',
    titleSingle: 'Liability',
    titlePlural: 'Liabilities',
    formData: FormData.account
  }
}
