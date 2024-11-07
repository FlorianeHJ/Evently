import {
    FaCheckCircle,
    FaEdit,
    FaRegStar,
    FaStar,
    FaTrash,
    FaUndo,
} from 'react-icons/fa'
import { Task } from '../../types'

interface TaskItemProps {
    task: Task
    onComplete?: () => void
    onDelete?: () => void
    onEdit?: () => void
    onReactivate?: () => void
    isCompleted?: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onComplete,
    onDelete,
    onEdit,
    onReactivate,
    isCompleted,
}) => {
    return (
        <div
            className={`flex justify-between items-center p-3 rounded-lg border ${
                isCompleted ? 'bg-primary/50 line-through' : ''
            }`}
        >
            <div className="flex items-center">
                {/* Priorité de la tâche */}
                <button className="mr-2 focus:outline-none">
                    {task.priority === 'Haute' ? (
                        <FaStar className="text-2xl text-btnHover" />
                    ) : (
                        <FaRegStar className="text-2xl text-gray-300" />
                    )}
                </button>

                {/* Titre de la tâche */}
                <h3
                    className={`text-md ${
                        isCompleted ? 'line-through text-gray-500' : ''
                    }`}
                >
                    {task.title}
                </h3>

                {/* Catégorie de la tâche */}
                <span className="ml-2 px-2 py-1 bg-primary rounded-full text-xs">
                    {task.category}
                </span>

                {/* Note de la tâche (affichée si elle existe) */}
                {task.note && (
                    <p className="ml-2 text-xs text-gray-600 italic">
                        {task.note}
                    </p>
                )}
            </div>

            <div className="flex space-x-2">
                {/* Bouton pour remettre en cours une tâche archivée */}
                {isCompleted && onReactivate && (
                    <button onClick={onReactivate} title="Réactiver la tâche">
                        <FaUndo className="text-xl text-blue-500" />
                    </button>
                )}

                {/* Bouton de complétion pour une tâche en cours */}
                {!isCompleted && (
                    <button onClick={onComplete} title="Marquer comme terminé">
                        <FaCheckCircle className="text-xl text-green-500" />
                    </button>
                )}

                {/* Bouton de modification pour une tâche en cours */}
                {!isCompleted && onEdit && (
                    <button onClick={onEdit} title="Modifier la tâche">
                        <FaEdit className="text-lg text-blue-500" />
                    </button>
                )}

                {/* Bouton de suppression */}
                <button onClick={onDelete} title="Supprimer définitivement">
                    <FaTrash className="text-lg text-red-500" />
                </button>
            </div>
        </div>
    )
}

export default TaskItem
