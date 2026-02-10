'use client';

import { MonthlySpending } from '@/types';
import { formatCurrency } from '@/utils/format';

interface MonthlyTrendChartProps {
  data: MonthlySpending[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trend</h3>
      {data.every((d) => d.total === 0) ? (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-3 block">📈</span>
          <p>No expense data to display</p>
        </div>
      ) : (
        <div className="flex items-end justify-between gap-2 h-48">
          {data.map((month, index) => {
            const height = maxTotal > 0 ? (month.total / maxTotal) * 100 : 0;
            const isCurrentMonth = index === data.length - 1;

            return (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center"
              >
                <div className="w-full flex flex-col items-center justify-end h-40">
                  {month.total > 0 && (
                    <span className="text-xs font-medium text-gray-600 mb-1">
                      {formatCurrency(month.total)}
                    </span>
                  )}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out ${
                      isCurrentMonth ? 'bg-indigo-500' : 'bg-indigo-200'
                    }`}
                    style={{
                      height: `${Math.max(height, month.total > 0 ? 4 : 0)}%`,
                      minHeight: month.total > 0 ? '4px' : '0px',
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2 text-center">
                  {month.month}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
