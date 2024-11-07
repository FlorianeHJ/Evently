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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Expense {
    category: string
    title: string
    amount: number
}

const BudgetPage: React.FC = () => {
    // États pour le budget et les dépenses
    const [initialBudget, setInitialBudget] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [newExpense, setNewExpense] = useState<Expense>({
        category: '',
        title: '',
        amount: 0,
    })

    // Calculs automatiques
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )
    const remainingBudget = initialBudget - totalExpenses

    // Fonction pour ajouter une nouvelle dépense
    const handleAddExpense = () => {
        if (newExpense.category && newExpense.title && newExpense.amount > 0) {
            setExpenses([...expenses, newExpense])
            setNewExpense({ category: '', title: '', amount: 0 })
        }
    }

    // Données du graphique
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
            {/* Partie gauche - Ajouter une dépense */}
            <div className="w-1/2 space-y-6">
                {/* Ajouter une dépense */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Ajouter une dépense
                    </h2>
                    <div className="flex flex-col gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Catégorie"
                            value={newExpense.category}
                            onChange={(e) =>
                                setNewExpense({
                                    ...newExpense,
                                    category: e.target.value,
                                })
                            }
                            className="p-1 text-xs rounded outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Titre de la dépense"
                            value={newExpense.title}
                            onChange={(e) =>
                                setNewExpense({
                                    ...newExpense,
                                    title: e.target.value,
                                })
                            }
                            className="p-1 text-xs rounded outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Montant (€)"
                            value={newExpense.amount || ''}
                            onChange={(e) =>
                                setNewExpense({
                                    ...newExpense,
                                    amount: parseFloat(e.target.value),
                                })
                            }
                            className="p-1 text-xs rounded outline-none"
                        />
                        <div className="flex items-center justify-center my-2">
                            <button
                                onClick={handleAddExpense}
                                className="btn text-xs"
                            >
                                Ajouter la dépense
                            </button>
                        </div>
                    </div>

                    {/* Liste des dépenses */}
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Titre</th>
                                <th>Montant (€)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <tr key={index} className="border-b">
                                    <td>{expense.category}</td>
                                    <td>{expense.title}</td>
                                    <td className="text-right">
                                        {expense.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Partie droite - Résumé du budget et graphique */}
            <div className="w-1/2 space-y-6">
                {/* Résumé du budget */}
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

                {/* Graphique des dépenses */}
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
