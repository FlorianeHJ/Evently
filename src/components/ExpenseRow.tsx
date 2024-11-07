import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface Expense {
    category: string
    title: string
    amount: number
}

interface ExpenseRowProps {
    expense: Expense
    isEditing: boolean
    isNewRow: boolean
    onChange: (field: keyof Expense, value: string | number) => void
    onEdit: () => void
    onSave: () => void
    onDelete: () => void
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({
    expense,
    isEditing,
    isNewRow,
    onChange,
    onEdit,
    onSave,
    onDelete,
}) => {
    return (
        <tr>
            <td className="p-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={expense.category}
                        onChange={(e) => onChange('category', e.target.value)}
                        className="p-1 text-xs rounded outline-none"
                        placeholder="Catégorie"
                    />
                ) : (
                    expense.category
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={expense.title}
                        onChange={(e) => onChange('title', e.target.value)}
                        className="p-1 text-xs rounded outline-none"
                        placeholder="Titre de la dépense"
                    />
                ) : (
                    expense.title
                )}
            </td>
            <td className="text-right">
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
                        className="p-1 text-xs rounded outline-none text-right"
                        placeholder="Montant (€)"
                    />
                ) : (
                    `${expense.amount} €`
                )}
            </td>
            <td className="flex justify-end space-x-2">
                {isEditing ? (
                    <button onClick={onSave} className="text-green-500 text-xs">
                        ✔
                    </button>
                ) : !isNewRow ? (
                    <>
                        <button
                            onClick={onEdit}
                            className="text-blue-500 text-xs"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={onDelete}
                            className="text-red-500 text-xs"
                        >
                            <FaTrash />
                        </button>
                    </>
                ) : null}
            </td>
        </tr>
    )
}

export default ExpenseRow
