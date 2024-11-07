import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface Expense {
    category: string
    title: string
    amount: number
    date: string
}

interface ExpenseRowProps {
    expense: Expense
    isEditing: boolean
    isNewRow: boolean
    onChange: (field: keyof Expense, value: string | number) => void
    onEdit: () => void
    onSave: () => void
    onDelete: () => void
    categories: string[]
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({
    expense,
    isEditing,
    isNewRow,
    onChange,
    onEdit,
    onSave,
    onDelete,
    categories,
}) => {
    return (
        <div className="flex items-center justify-between border-b py-2">
            {/* Catégorie */}
            <div className="w-1/4 p-1">
                {isEditing ? (
                    <select
                        value={expense.category}
                        onChange={(e) => onChange('category', e.target.value)}
                        className="p-1 text-xs rounded outline-none w-full"
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="text-sm">{expense.category}</span>
                )}
            </div>

            {/* Titre */}
            <div className="w-1/4 p-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={expense.title}
                        onChange={(e) => onChange('title', e.target.value)}
                        className="p-1 text-xs rounded outline-none w-full"
                        placeholder="Titre de la dépense"
                        required
                    />
                ) : (
                    <span className="text-sm">{expense.title}</span>
                )}
            </div>

            {/* Montant */}
            <div className="w-1/4 p-1 text-right">
                {isEditing ? (
                    <input
                        type="number"
                        value={expense.amount || ''}
                        onChange={(e) =>
                            onChange('amount', parseFloat(e.target.value))
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onSave()
                        }}
                        className="p-1 text-xs rounded outline-none w-full text-right"
                        placeholder="Montant (€)"
                        required
                    />
                ) : (
                    <span className="text-sm">{`${expense.amount} €`}</span>
                )}
            </div>

            {/* Date */}
            <div className="w-1/4 p-1 text-right">
                {isEditing ? (
                    <input
                        type="date"
                        value={expense.date}
                        onChange={(e) => onChange('date', e.target.value)}
                        className="p-1 text-xs rounded outline-none w-full text-right"
                        required
                    />
                ) : (
                    <span className="text-sm">{expense.date}</span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-2 p-1">
                {!isEditing && !isNewRow ? (
                    <>
                        <button
                            onClick={onEdit}
                            className="text-xs flex items-center"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={onDelete}
                            className="text-xs flex items-center"
                        >
                            <FaTrash />
                        </button>
                    </>
                ) : isEditing ? (
                    <button
                        onClick={onSave}
                        className="text-xs text-green-500 flex items-center"
                    >
                        ✔
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default ExpenseRow
