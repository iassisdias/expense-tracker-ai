'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExpenseContext } from '@/components/ExpenseProvider';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseFormData } from '@/types';

export default function AddExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenseContext();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (data: ExpenseFormData) => {
    addExpense(data);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-emerald-500 text-xl">✓</span>
          <div>
            <p className="font-medium text-emerald-800">Expense added successfully!</p>
            <p className="text-sm text-emerald-600">Your expense has been recorded.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Expense</h1>
        <p className="text-gray-500 mt-1">Record a new expense</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>

      {/* Quick Links */}
      <div className="mt-6 flex items-center justify-center gap-4 text-sm">
        <button
          onClick={() => router.push('/expenses')}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View all expenses
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
