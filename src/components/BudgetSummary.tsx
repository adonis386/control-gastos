import React from 'react';
import { Wallet, TrendingDown, Receipt } from 'lucide-react';

interface BudgetSummaryProps {
  budget: number;
  remaining: number;
  spent: number;
}

export function BudgetSummary({ budget, remaining, spent }: BudgetSummaryProps) {
  const remainingPercentage = (remaining / budget) * 100;
  
  const getStatusColor = () => {
    if (remainingPercentage <= 25) return 'text-red-600';
    if (remainingPercentage <= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Presupuesto</h2>
        </div>
        <p className="text-2xl font-bold text-blue-600">${budget.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="h-6 w-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Gastado</h2>
        </div>
        <p className="text-2xl font-bold text-purple-600">${spent.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <TrendingDown className="h-6 w-6 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Disponible</h2>
        </div>
        <p className={`text-2xl font-bold ${getStatusColor()}`}>
          ${remaining.toFixed(2)}
        </p>
      </div>
    </div>
  );
}