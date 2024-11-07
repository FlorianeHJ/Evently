import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { FaPlus } from 'react-icons/fa'
import ExpenseRow from './ExpenseRow'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Expense {
    category: string
    title: string
    amount: number
}

const BudgetPage: React.FC = () => {
    const [initialBudget, setInitialBudget] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [newExpense, setNewExpense] = useState<Expense>({
        category: '',
        title: '',
        amount: 0,
    })

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )
    const remainingBudget = initialBudget - totalExpenses

    const handleAddExpense = () => {
        if (newExpense.category && newExpense.title && newExpense.amount > 0) {
            setExpenses([...expenses, newExpense])
            setNewExpense({ category: '', title: '', amount: 0 })
            setIsEditing(expenses.length + 1) // Basculer vers une nouvelle ligne vide
        }
    }

    const handleEditExpense = (index: number) => {
        setIsEditing(index)
        setNewExpense(expenses[index])
    }

    const handleSaveEditExpense = (index: number) => {
        const updatedExpenses = [...expenses]
        updatedExpenses[index] = newExpense
        setExpenses(updatedExpenses)
        setIsEditing(null)
        setNewExpense({ category: '', title: '', amount: 0 })
    }

    const handleDeleteExpense = (index: number) => {
        setExpenses(expenses.filter((_, i) => i !== index))
    }

    const chartData = {
        labels: ['Dépenses', 'Budget restant'],
        datasets: [
            {
                label: 'Montant (€)',
                data: [
                    totalExpenses,
                    remainingBudget > 0 ? remainingBudget : 0,
                ],
                backgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    }

    return (
        <div className="flex gap-4 p-6">
            {/* Partie gauche - Tableau des dépenses */}
            <div className="w-1/2 space-y-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                        Dépenses
                        <button
                            onClick={() => setIsEditing(expenses.length)}
                            className="text-primary text-lg"
                        >
                            <FaPlus />
                        </button>
                    </h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Titre</th>
                                <th>Montant (€)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <ExpenseRow
                                    key={index}
                                    expense={expense}
                                    isEditing={isEditing === index}
                                    isNewRow={false}
                                    onChange={(field, value) =>
                                        setNewExpense({
                                            ...newExpense,
                                            [field]: value,
                                        })
                                    }
                                    onEdit={() => handleEditExpense(index)}
                                    onSave={() => handleSaveEditExpense(index)}
                                    onDelete={() => handleDeleteExpense(index)}
                                />
                            ))}
                            {isEditing === expenses.length && (
                                <ExpenseRow
                                    expense={newExpense}
                                    isEditing={true}
                                    isNewRow={true}
                                    onChange={(field, value) =>
                                        setNewExpense({
                                            ...newExpense,
                                            [field]: value,
                                        })
                                    }
                                    onEdit={() => {}}
                                    onSave={handleAddExpense}
                                    onDelete={() => {}}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Partie droite - Résumé du budget et graphique */}
            <div className="w-1/2 space-y-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Résumé du budget
                    </h2>
                    <div className="flex flex-col gap-2">
                        <label className="flex justify-between items-center">
                            Budget initial :
                            <input
                                type="number"
                                value={initialBudget}
                                onChange={(e) =>
                                    setInitialBudget(parseFloat(e.target.value))
                                }
                                className="ml-2 p-1 rounded outline-none text-right"
                            />
                            €
                        </label>
                        <label className="flex justify-between items-center">
                            Dépenses totales :<span>{totalExpenses} €</span>
                        </label>
                        <label className="flex justify-between items-center">
                            Budget restant :
                            <span>
                                {remainingBudget >= 0 ? remainingBudget : 0} €
                            </span>
                        </label>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Graphique des dépenses
                    </h2>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `${context.raw} €`,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BudgetPage
