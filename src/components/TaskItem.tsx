import { format, isPast, isToday, isTomorrow, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
    FaCheckCircle,
    FaEdit,
    FaRegStar,
    FaStar,
    FaTrash,
    FaUndo,
} from 'react-icons/fa'
import { FaCalendarDays } from 'react-icons/fa6'
import { Task } from '../../types'

interface TaskItemProps {
    task: Task
    onComplete?: () => void
    onDelete?: () => void
    onEdit?: () => void
    onReactivate?: () => void
    isCompleted?: boolean
    hideCategory?: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onComplete,
    onDelete,
    onEdit,
    onReactivate,
    isCompleted,
    hideCategory,
}) => {
    // Formatage de la date d'échéance
    const formatDueDate = (dateString: string) => {
        const date = parseISO(dateString)
        if (isToday(date)) return "aujourd'hui"
        if (isTomorrow(date)) return 'demain'
        return format(date, 'dd MMM yyyy', { locale: fr })
    }

    const dueDateClassName =
        task.dueDate &&
        isPast(parseISO(task.dueDate)) &&
        !isToday(parseISO(task.dueDate))
            ? 'text-error' // Rouge si la date est passée
            : ''

    return (
        <div
            className={`flex justify-between items-center p-2 rounded-lg border ${
                isCompleted ? 'bg-primary/50 line-through' : ''
            }`}
        >
            <div className="flex items-center">
                {/* Priorité de la tâche */}
                <button className="mr-2 focus:outline-none">
                    {task.priority === 'Haute' ? (
                        <FaStar className="text-xl" />
                    ) : (
                        <FaRegStar className="text-xl " />
                    )}
                </button>

                {/* Catégorie de la tâche, cachée si hideCategory est vrai */}
                {!hideCategory && (
                    <span className="ml-2 px-2 py-1 bg-primary rounded-full text-xs">
                        {task.category}
                    </span>
                )}

                {/* Titre de la tâche */}
                <h3
                    className={`ml-2 text-sm ${
                        isCompleted ? 'line-through text-gray-500' : ''
                    }`}
                >
                    {task.title}
                </h3>

                {/* Date d'échéance avec icône de calendrier */}
                {task.dueDate && (
                    <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full flex items-center gap-1 ${dueDateClassName}`}
                    >
                        <FaCalendarDays /> {formatDueDate(task.dueDate)}
                    </span>
                )}

                {/* Note de la tâche */}
                {task.note && (
                    <p className="ml-2 text-xs italic">{task.note}</p>
                )}
            </div>

            <div className="flex space-x-2">
                {isCompleted && onReactivate && (
                    <button onClick={onReactivate} title="Réactiver la tâche">
                        <FaUndo className="text-xl text-blue-500" />
                    </button>
                )}

                {!isCompleted && (
                    <button onClick={onComplete} title="Marquer comme terminé">
                        <FaCheckCircle className="text-xl text-green-500" />
                    </button>
                )}

                {!isCompleted && onEdit && (
                    <button onClick={onEdit} title="Modifier la tâche">
                        <FaEdit className="text-lg text-blue-500" />
                    </button>
                )}

                <button onClick={onDelete} title="Supprimer définitivement">
                    <FaTrash className="text-lg text-red-500" />
                </button>
            </div>
        </div>
    )
}

export default TaskItem
