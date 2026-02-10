import { Expense } from '@/types';
import { formatDate, formatCurrency } from './format';

export function exportToCSV(expenses: Expense[], filename: string = 'expenses'): void {
  const headers = ['Date', 'Description', 'Category', 'Amount'];

  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    `"${expense.description.replace(/"/g, '""')}"`,
    expense.category,
    expense.amount.toFixed(2),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function generateExpenseSummaryText(expenses: Expense[]): string {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = expenses.length;

  let summary = `Expense Summary\n`;
  summary += `================\n\n`;
  summary += `Total Expenses: ${count}\n`;
  summary += `Total Amount: ${formatCurrency(total)}\n\n`;
  summary += `Details:\n`;
  summary += `---------\n`;

  expenses.forEach((expense) => {
    summary += `${formatDate(expense.date)} | ${expense.category} | ${expense.description} | ${formatCurrency(expense.amount)}\n`;
  });

  return summary;
}
