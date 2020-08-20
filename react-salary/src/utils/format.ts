const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatterPercent = Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
});

function formatNumber(value: number): string {
  return formatter.format(value);
}

function formatPercentage(total: number, value: number): string {
  return ((value * 100) / total).toFixed(2);
}

export { formatNumber, formatPercentage };
