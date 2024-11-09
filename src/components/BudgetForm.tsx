import React from 'react';
import { DollarSign } from 'lucide-react';

interface BudgetFormProps {
  onBudgetSet: (amount: number) => void;
  isInitial: boolean;
}

export function BudgetForm({ onBudgetSet, isInitial }: BudgetFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('budget'));
    if (amount > 0) {
      onBudgetSet(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="number"
          name="budget"
          className="block w-full p-4 ps-10 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa tu presupuesto"
          required
          min="1"
          step="0.01"
        />
        <button
          type="submit"
          className="absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors"
        >
          {isInitial ? 'Establecer Presupuesto' : 'Actualizar Presupuesto'}
        </button>
      </div>
    </form>
  );
}