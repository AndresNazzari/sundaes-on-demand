//format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimunFractionDigits: 2,
  }).format(amount);
}
