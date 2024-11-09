import React, { useState, useEffect } from 'react';
import { BudgetForm } from './components/BudgetForm';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetSummary } from './components/BudgetSummary';
import { Expense } from './types';
import { RotateCcw } from 'lucide-react';

function App() {
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('budget');
    return saved ? Number(saved) : 0;
  });
  
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const remaining = budget - expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const spent = budget - remaining;

  const handleBudgetSet = (amount: number) => {
    setBudget(amount);
  };

  const handleExpenseAdd = (description: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount,
      date: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleExpenseDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo el presupuesto? Esta acción no se puede deshacer.')) {
      setBudget(0);
      setExpenses([]);
      localStorage.removeItem('budget');
      localStorage.removeItem('expenses');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Control de Presupuesto
          </h1>
          {budget > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              title="Reiniciar presupuesto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reiniciar</span>
            </button>
          )}
        </div>

        {budget === 0 ? (
          <div className="flex justify-center mb-8">
            <BudgetForm onBudgetSet={handleBudgetSet} isInitial={true} />
          </div>
        ) : (
          <div className="space-y-8">
            <BudgetSummary
              budget={budget}
              remaining={remaining}
              spent={spent}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Agregar Nueva Factura
                </h2>
                <ExpenseForm onExpenseAdd={handleExpenseAdd} />
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Listado de Facturas
                </h2>
                <ExpenseList
                  expenses={expenses}
                  onExpenseDelete={handleExpenseDelete}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <BudgetForm onBudgetSet={handleBudgetSet} isInitial={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;