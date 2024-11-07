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
import { FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import ExpenseRow from './ExpenseRow'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Expense {
    category: string
    title: string
    amount: number
    date: string
}

const BudgetPage: React.FC = () => {
    const [initialBudget, setInitialBudget] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [newExpense, setNewExpense] = useState<Expense>({
        category: '',
        title: '',
        amount: 0,
        date: '',
    })
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const categories = ['Nourriture', 'Transport', 'Logement', 'Autres']

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )
    const remainingBudget = initialBudget - totalExpenses

    const handleAddExpense = () => {
        if (newExpense.category && newExpense.title && newExpense.amount > 0) {
            setExpenses([...expenses, newExpense])
            setNewExpense({ category: '', title: '', amount: 0, date: '' })
            setIsEditing(expenses.length + 1)
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
        setNewExpense({ category: '', title: '', amount: 0, date: '' })
    }

    const handleDeleteExpense = (index: number) => {
        setExpenses(expenses.filter((_, i) => i !== index))
    }

    const toggleSortOrder = () => {
        const sortedExpenses = [...expenses].sort((a, b) => {
            const amountComparison = a.amount - b.amount
            return sortOrder === 'asc' ? amountComparison : -amountComparison
        })
        setExpenses(sortedExpenses)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
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
        <div className="flex gap-4 py-6">
            {/* Partie gauche - Liste des dépenses */}
            <div className="w-1/2 space-y-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                        Dépenses
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleSortOrder}
                                title="Trier les dépenses"
                                className="text-primary text-lg"
                            >
                                {sortOrder === 'asc' ? (
                                    <FaSortAlphaUp />
                                ) : (
                                    <FaSortAlphaDown />
                                )}
                            </button>
                            <button
                                onClick={() => setIsEditing(expenses.length)}
                                className="text-primary text-lg"
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </h2>
                    <div className="space-y-2">
                        {/* En-têtes */}
                        <div className="flex text-sm font-semibold text-gray-600 border-b pb-2">
                            <div className="w-1/4">Catégorie</div>
                            <div className="w-1/4">Titre</div>
                            <div className="w-1/4 text-right">Montant (€)</div>
                            <div className="w-1/4 text-right">Date</div>
                        </div>

                        {/* Liste des dépenses */}
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
                                categories={categories}
                            />
                        ))}
                        {/* Ligne de saisie pour une nouvelle dépense */}
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
                                categories={categories}
                            />
                        )}
                    </div>
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
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={initialBudget}
                                    onChange={(e) =>
                                        setInitialBudget(
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="ml-2 p-1 rounded outline-none text-right"
                                />
                                <span className="ml-1">€</span>
                            </div>
                        </label>
                        <label className="flex justify-between items-center">
                            Dépenses totales :<span>{totalExpenses} €</span>
                        </label>
                        <label className="flex justify-between items-center">
                            Budget restant :
                            <span
                                className={
                                    remainingBudget < 0 ? 'text-red-500' : ''
                                }
                            >
                                {remainingBudget} €
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
