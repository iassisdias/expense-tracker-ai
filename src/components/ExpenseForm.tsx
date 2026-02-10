'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ExpenseFormData, Expense, Category, CATEGORIES, CATEGORY_ICONS } from '@/types';
import { getTodayDateString } from '@/utils/format';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: Expense;
  isEditing?: boolean;
  onCancel?: () => void;
}

interface FormErrors {
  amount?: string;
  description?: string;
  date?: string;
  category?: string;
}

export function ExpenseForm({ onSubmit, initialData, isEditing = false, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: initialData?.amount.toString() || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
    date: initialData?.date || getTodayDateString(),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
        date: initialData.date,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 2) {
      newErrors.description = 'Description must be at least 2 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          amount: '',
          category: 'Food',
          description: '',
          date: getTodayDateString(),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = sanitized.split('.');
    const formatted = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : sanitized;
    setFormData({ ...formData, amount: formatted });
    if (errors.amount) setErrors({ ...errors, amount: undefined });
  };

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat,
    label: `${CATEGORY_ICONS[cat]} ${cat}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Amount"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          error={errors.amount}
          className="text-lg"
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => {
            setFormData({ ...formData, date: e.target.value });
            if (errors.date) setErrors({ ...errors, date: undefined });
          }}
          error={errors.date}
          max={getTodayDateString()}
        />
      </div>

      <Select
        label="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
        options={categoryOptions}
        error={errors.category}
      />

      <Input
        label="Description"
        type="text"
        placeholder="What did you spend on?"
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
          if (errors.description) setErrors({ ...errors, description: undefined });
        }}
        error={errors.description}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </Button>
        {isEditing && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
