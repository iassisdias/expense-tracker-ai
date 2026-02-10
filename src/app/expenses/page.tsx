'use client';

import { useState } from 'react';
import { useExpenseContext } from '@/components/ExpenseProvider';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExportButton } from '@/components/ExportButton';
import { Modal } from '@/components/ui/Modal';
import { ExpenseListSkeleton } from '@/components/ui/Skeleton';
import { Expense, ExpenseFormData } from '@/types';
import Link from 'next/link';

export default function ExpensesPage() {
  const { expenses, isLoaded, updateExpense, deleteExpense } = useExpenseContext();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
      setEditingExpense(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-48 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <ExpenseListSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-500 mt-1">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} recorded
          </p>
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

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            onSubmit={handleUpdate}
            initialData={editingExpense}
            isEditing
            onCancel={() => setEditingExpense(null)}
          />
        )}
      </Modal>
    </div>
  );
}
