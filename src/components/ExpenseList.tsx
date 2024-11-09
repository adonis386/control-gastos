import React from 'react';
import { Trash2 } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onExpenseDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay facturas registradas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div>
            <h3 className="font-medium text-gray-900">{expense.description}</h3>
            <p className="text-sm text-gray-500">
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900">
              ${expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => onExpenseDelete(expense.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Eliminar factura"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}