'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { exportToCSV } from '@/utils/export';
import { Button } from './ui/Button';

interface ExportButtonProps {
  expenses: Expense[];
}

export function ExportButton({ expenses }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (expenses.length === 0) return;

    setIsExporting(true);
    try {
      // Small delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 200));
      exportToCSV(expenses);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleExport}
      disabled={expenses.length === 0}
      isLoading={isExporting}
      className="gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </Button>
  );
}
