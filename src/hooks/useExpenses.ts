'use client';

import { useCallback, useMemo } from 'react';
import { Expense, ExpenseFormData, ExpenseFilters, Category } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '@/utils/format';

const STORAGE_KEY = 'expense-tracker-expenses';

export function useExpenses() {
  const [expenses, setExpenses, isLoaded] = useLocalStorage<Expense[]>(STORAGE_KEY, []);

  const addExpense = useCallback((formData: ExpenseFormData): Expense => {
    const now = new Date().toISOString();
    const newExpense: Expense = {
      id: generateId(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date,
      createdAt: now,
      updatedAt: now,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  }, [setExpenses]);

  const updateExpense = useCallback((id: string, formData: ExpenseFormData): void => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              amount: parseFloat(formData.amount),
              category: formData.category,
              description: formData.description.trim(),
              date: formData.date,
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );
  }, [setExpenses]);

  const deleteExpense = useCallback((id: string): void => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, [setExpenses]);

  const getExpense = useCallback((id: string): Expense | undefined => {
    return expenses.find((expense) => expense.id === id);
  }, [expenses]);

  const filterExpenses = useCallback((filters: ExpenseFilters): Expense[] => {
    return expenses.filter((expense) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          expense.description.toLowerCase().includes(searchLower) ||
          expense.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'All' && expense.category !== filters.category) {
        return false;
      }

      // Date range filter
      if (filters.startDate && expense.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && expense.date > filters.endDate) {
        return false;
      }

      return true;
    });
  }, [expenses]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses]);

  return {
    expenses: sortedExpenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
    filterExpenses,
  };
}
