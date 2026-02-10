'use client';

import { useExpenseContext } from '@/components/ExpenseProvider';
import { SummaryCards } from '@/components/SummaryCards';
import { CategoryChart } from '@/components/CategoryChart';
import { MonthlyTrendChart } from '@/components/MonthlyTrendChart';
import { ExportButton } from '@/components/ExportButton';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { CATEGORY_ICONS } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { expenses, analytics, isLoaded } = useExpenseContext();

  if (!isLoaded) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Track and analyze your spending</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton expenses={expenses} />
          <Link
            href="/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Expense
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards analytics={analytics} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart categories={analytics.categorySummaries} />
        <MonthlyTrendChart data={analytics.monthlyTrend} />
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          <Link
            href="/expenses"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View all
          </Link>
        </div>
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl mb-3 block">💰</span>
            <p className="mb-4">No expenses recorded yet</p>
            <Link
              href="/add"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add your first expense
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{CATEGORY_ICONS[expense.category]}</span>
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
