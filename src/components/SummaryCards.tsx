'use client';

import { Analytics, CATEGORY_ICONS } from '@/types';
import { formatCurrency } from '@/utils/format';

interface SummaryCardsProps {
  analytics: Analytics;
}

export function SummaryCards({ analytics }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Spending',
      value: formatCurrency(analytics.totalSpending),
      icon: '💰',
      color: 'bg-indigo-500',
      description: `${analytics.totalExpenses} expenses`,
    },
    {
      title: 'This Month',
      value: formatCurrency(analytics.monthlySpending),
      icon: '📅',
      color: 'bg-emerald-500',
      description: 'Current month spending',
    },
    {
      title: 'Average Expense',
      value: formatCurrency(analytics.averageExpense),
      icon: '📊',
      color: 'bg-amber-500',
      description: 'Per transaction',
    },
    {
      title: 'Top Category',
      value: analytics.topCategory || 'N/A',
      icon: analytics.topCategory ? CATEGORY_ICONS[analytics.topCategory] : '❓',
      color: 'bg-purple-500',
      description: analytics.topCategory
        ? formatCurrency(
            analytics.categorySummaries.find((c) => c.category === analytics.topCategory)?.total || 0
          )
        : 'No data',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{card.title}</span>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
          <div className="text-sm text-gray-500">{card.description}</div>
        </div>
      ))}
    </div>
  );
}
