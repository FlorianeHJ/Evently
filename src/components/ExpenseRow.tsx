import React, { useState } from 'react'
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
    const [errors, setErrors] = useState({
        title: false,
        amount: false,
        date: false,
    })

    const validateFields = () => {
        const newErrors = {
            title: !expense.title,
            amount: expense.amount <= 0,
            date: !expense.date,
        }
        setErrors(newErrors)
        return !newErrors.title && !newErrors.amount && !newErrors.date
    }

    const handleSave = () => {
        if (validateFields()) {
            onSave()
        }
    }

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
                    <>
                        <input
                            type="text"
                            value={expense.title}
                            onChange={(e) => onChange('title', e.target.value)}
                            className={`p-1 text-xs rounded outline-none w-full ${
                                errors.title ? 'border border-red-500' : ''
                            }`}
                            placeholder="Titre de la dépense"
                        />
                        {errors.title && (
                            <p className="text-error italic text-xs mt-1">
                                Incomplet
                            </p>
                        )}
                    </>
                ) : (
                    <span className="text-sm">{expense.title}</span>
                )}
            </div>

            {/* Montant */}
            <div className="w-1/4 p-1 text-right">
                {isEditing ? (
                    <>
                        <input
                            type="number"
                            value={expense.amount || ''}
                            onChange={(e) =>
                                onChange('amount', parseFloat(e.target.value))
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave()
                            }}
                            className={`p-1 text-xs rounded outline-none w-full text-right ${
                                errors.amount ? 'border border-red-500' : ''
                            }`}
                            placeholder="Montant (€)"
                        />
                        {errors.amount && (
                            <p className="italic text-error text-xs mt-1">
                                Incomplet
                            </p>
                        )}
                    </>
                ) : (
                    <span className="text-sm">{`${expense.amount} €`}</span>
                )}
            </div>

            {/* Date */}
            <div className="w-1/4 p-1 text-right">
                {isEditing ? (
                    <>
                        <input
                            type="date"
                            value={expense.date}
                            onChange={(e) => onChange('date', e.target.value)}
                            className="p-1 text-xs rounded outline-none w-full text-right"
                        />
                    </>
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
                        onClick={handleSave}
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
