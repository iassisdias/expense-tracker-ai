export type Category =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  amount: string;
  category: Category;
  description: string;
  date: string;
}

export interface ExpenseFilters {
  search: string;
  category: Category | 'All';
  startDate: string;
  endDate: string;
}

export interface CategorySummary {
  category: Category;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string;
  total: number;
}

export interface Analytics {
  totalSpending: number;
  monthlySpending: number;
  averageExpense: number;
  totalExpenses: number;
  categorySummaries: CategorySummary[];
  monthlyTrend: MonthlySpending[];
  topCategory: Category | null;
}

export const CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#22c55e',
  Transportation: '#3b82f6',
  Entertainment: '#a855f7',
  Shopping: '#f97316',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '📄',
  Other: '📦',
};
