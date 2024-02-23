const FormData = {
  name: '',
  email: '',
  amount: '',
  start_date: '',
  recurrence_rule: '',
}

export const AccountsTabs = {
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
