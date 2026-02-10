'use client';

import { CategorySummary, CATEGORY_COLORS, CATEGORY_ICONS } from '@/types';
import { formatCurrency } from '@/utils/format';

interface CategoryChartProps {
  categories: CategorySummary[];
}

export function CategoryChart({ categories }: CategoryChartProps) {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-3 block">📊</span>
          <p>No expense data to display</p>
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(...categories.map((c) => c.total));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{CATEGORY_ICONS[category.category]}</span>
                <span className="font-medium text-gray-700">{category.category}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(category.total)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({category.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(category.total / maxTotal) * 100}%`,
                  backgroundColor: CATEGORY_COLORS[category.category],
                }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {category.count} {category.count === 1 ? 'expense' : 'expenses'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
