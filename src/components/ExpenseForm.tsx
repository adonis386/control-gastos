import React from 'react';
import { Receipt } from 'lucide-react';

interface ExpenseFormProps {
  onExpenseAdd: (description: string, amount: number) => void;
}

export function ExpenseForm({ onExpenseAdd }: ExpenseFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('description') as string;
    const amount = Number(formData.get('amount'));
    
    if (description && amount > 0) {
      onExpenseAdd(description, amount);
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la factura
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Receipt className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            id="description"
            name="description"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Luz, Agua, etc."
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Monto
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            required
            min="0.01"
            step="0.01"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-4 transition-colors"
      >
        Agregar Factura
      </button>
    </form>
  );
}