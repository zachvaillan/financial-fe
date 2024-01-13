export const centsToDollars = (cents) => {
  return `$${(cents / 100).toFixed(2)}`
}