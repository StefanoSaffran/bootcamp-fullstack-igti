const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value: number): string {
  return formatter.format(value);
}

export { formatNumber };
