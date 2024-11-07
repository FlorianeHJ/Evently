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
import { FaSort } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import ExpenseRow from './ExpenseRow'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Expense {
    category: string
    title: string
    amount: number
    date: string
}

const BudgetPage: React.FC = () => {
    const [initialBudget, setInitialBudget] = useState<number | ''>(0)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [newExpense, setNewExpense] = useState<Expense>({
        category: '',
        title: '',
        amount: 0,
        date: '',
    })
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Expense
        direction: 'asc' | 'desc'
    } | null>(null)
    const categories = ['Nourriture', 'Transport', 'Logement', 'Autres']

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )
    const remainingBudget =
        typeof initialBudget === 'number' ? initialBudget - totalExpenses : 0

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

    const sortByColumn = (key: keyof Expense) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc'
        }
        const sortedExpenses = [...expenses].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
            return 0
        })
        setExpenses(sortedExpenses)
        setSortConfig({ key, direction })
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
                        <button
                            onClick={() => setIsEditing(expenses.length)}
                            className="text-primary text-lg"
                        >
                            <FaPlus />
                        </button>
                    </h2>
                    <div className="space-y-2">
                        {/* En-têtes */}
                        <div className="flex text-sm font-semibold text-gray-600 border-b pb-2">
                            <div className="w-1/4 flex items-center">
                                Catégorie
                                <button
                                    onClick={() => sortByColumn('category')}
                                    className="ml-1"
                                >
                                    <FaSort />
                                </button>
                            </div>
                            <div className="w-1/4 flex items-center">
                                Titre
                                <button
                                    onClick={() => sortByColumn('title')}
                                    className="ml-1"
                                >
                                    <FaSort />
                                </button>
                            </div>
                            <div className="w-1/4 flex items-center justify-end">
                                Montant (€)
                                <button
                                    onClick={() => sortByColumn('amount')}
                                    className="ml-1"
                                >
                                    <FaSort />
                                </button>
                            </div>
                            <div className="w-1/4 flex items-center justify-end">
                                Date
                                <button
                                    onClick={() => sortByColumn('date')}
                                    className="ml-1"
                                >
                                    <FaSort />
                                </button>
                            </div>
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
                                    value={initialBudget || ''}
                                    onChange={(e) =>
                                        setInitialBudget(
                                            e.target.value === ''
                                                ? ''
                                                : parseFloat(e.target.value)
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
