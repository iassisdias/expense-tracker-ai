'use client';

import { useState, useMemo } from 'react';
import { Expense, ExpenseFilters, Category, CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  const [filters, setFilters] = useState<ExpenseFilters>({
    search: '',
    category: 'All',
    startDate: '',
    endDate: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          expense.description.toLowerCase().includes(searchLower) ||
          expense.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.category !== 'All' && expense.category !== filters.category) {
        return false;
      }

      if (filters.startDate && expense.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && expense.date > filters.endDate) {
        return false;
      }

      return true;
    });
  }, [expenses, filters]);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...CATEGORIES.map((cat) => ({
      value: cat,
      label: `${CATEGORY_ICONS[cat]} ${cat}`,
    })),
  ];

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      startDate: '',
      endDate: '',
    });
  };

  const hasActiveFilters = filters.search || filters.category !== 'All' || filters.startDate || filters.endDate;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value as Category | 'All' })}
            options={categoryOptions}
          />
          <Input
            type="date"
            placeholder="Start date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <Input
            type="date"
            placeholder="End date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-600">
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
          {hasActiveFilters && ` (filtered from ${expenses.length})`}
        </p>
        <p className="text-sm font-medium text-gray-900">
          Total: {formatCurrency(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0))}
        </p>
      </div>

      {/* Expense list */}
      {filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-3">
            {hasActiveFilters ? '🔍' : '💰'}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {hasActiveFilters ? 'No matching expenses' : 'No expenses yet'}
          </h3>
          <p className="text-gray-500">
            {hasActiveFilters
              ? 'Try adjusting your filters to find what you\'re looking for.'
              : 'Start tracking your spending by adding your first expense.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}15` }}
                >
                  {CATEGORY_ICONS[expense.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-gray-900 truncate">
                      {expense.description}
                    </h4>
                    <span className="font-semibold text-gray-900 whitespace-nowrap">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[expense.category]}15`,
                        color: CATEGORY_COLORS[expense.category],
                      }}
                    >
                      {expense.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(expense.date)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(expense)}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(expense.id)}
                    className={deleteConfirm === expense.id ? 'text-red-600 hover:text-red-700' : 'text-gray-500 hover:text-red-600'}
                  >
                    {deleteConfirm === expense.id ? (
                      <span className="text-xs">Confirm?</span>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
