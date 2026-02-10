'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Expense, ExpenseFormData, Analytics } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';
import { calculateAnalytics } from '@/utils/analytics';

interface ExpenseContextType {
  expenses: Expense[];
  isLoaded: boolean;
  analytics: Analytics;
  addExpense: (data: ExpenseFormData) => Expense;
  updateExpense: (id: string, data: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  getExpense: (id: string) => Expense | undefined;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
  } = useExpenses();

  const analytics = useMemo(() => calculateAnalytics(expenses), [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        isLoaded,
        analytics,
        addExpense,
        updateExpense,
        deleteExpense,
        getExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
}
