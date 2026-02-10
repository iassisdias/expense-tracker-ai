import { Expense, Category, CategorySummary, MonthlySpending, Analytics, CATEGORIES } from '@/types';
import { isCurrentMonth, getMonthYear } from './format';

export function calculateAnalytics(expenses: Expense[]): Analytics {
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyExpenses = expenses.filter((exp) => isCurrentMonth(exp.date));
  const monthlySpending = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const averageExpense = expenses.length > 0 ? totalSpending / expenses.length : 0;

  const categorySummaries = calculateCategorySummaries(expenses, totalSpending);
  const monthlyTrend = calculateMonthlyTrend(expenses);

  const topCategory = categorySummaries.length > 0
    ? categorySummaries.reduce((max, curr) => curr.total > max.total ? curr : max).category
    : null;

  return {
    totalSpending,
    monthlySpending,
    averageExpense,
    totalExpenses: expenses.length,
    categorySummaries,
    monthlyTrend,
    topCategory,
  };
}

function calculateCategorySummaries(expenses: Expense[], totalSpending: number): CategorySummary[] {
  const categoryMap = new Map<Category, { total: number; count: number }>();

  CATEGORIES.forEach((category) => {
    categoryMap.set(category, { total: 0, count: 0 });
  });

  expenses.forEach((expense) => {
    const current = categoryMap.get(expense.category)!;
    categoryMap.set(expense.category, {
      total: current.total + expense.amount,
      count: current.count + 1,
    });
  });

  const summaries: CategorySummary[] = [];
  categoryMap.forEach((data, category) => {
    if (data.count > 0) {
      summaries.push({
        category,
        total: data.total,
        count: data.count,
        percentage: totalSpending > 0 ? (data.total / totalSpending) * 100 : 0,
      });
    }
  });

  return summaries.sort((a, b) => b.total - a.total);
}

function calculateMonthlyTrend(expenses: Expense[]): MonthlySpending[] {
  const monthMap = new Map<string, number>();

  // Get last 6 months
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = getMonthYear(date.toISOString());
    monthMap.set(monthKey, 0);
  }

  expenses.forEach((expense) => {
    const monthKey = getMonthYear(expense.date);
    if (monthMap.has(monthKey)) {
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + expense.amount);
    }
  });

  const trend: MonthlySpending[] = [];
  monthMap.forEach((total, month) => {
    trend.push({ month, total });
  });

  return trend;
}
