import { Task } from '@/types' // Assurez-vous que le type est bien importé depuis le fichier types.ts
import { useState } from 'react'
import { FaCheckCircle, FaEdit, FaStar, FaTrash } from 'react-icons/fa'

interface TaskItemProps {
    task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [completed, setCompleted] = useState(task.completed)
    const [priority, setPriority] = useState<'Basse' | 'Haute'>(task.priority)

    const togglePriority = () => {
        setPriority(priority === 'Haute' ? 'Basse' : 'Haute')
    }

    return (
        <div
            className={`flex justify-between items-center p-3 rounded-lg border ${
                completed ? 'bg-primary/50' : ''
            }`}
        >
            <div className="flex items-center">
                <button onClick={togglePriority} className="mr-2">
                    <FaStar
                        className={`text-2xl ${
                            priority === 'Haute'
                                ? 'text-highlight'
                                : 'text-gray-300'
                        }`}
                    />
                </button>
                <h3
                    className={`text-lg ${
                        completed ? 'line-through text-gray-500' : 'text-black'
                    }`}
                >
                    {task.title}
                </h3>
                <span className="ml-2 px-2 py-1 bg-primary text-white rounded-full text-xs">
                    {task.category}
                </span>
            </div>

            <div className="flex space-x-2">
                <button onClick={() => setCompleted(!completed)}>
                    <FaCheckCircle
                        className={`text-2xl ${
                            completed ? 'text-green-500' : 'text-gray-500'
                        }`}
                    />
                </button>
                <button>
                    <FaEdit className="text-xl text-blue-500" />
                </button>
                <button>
                    <FaTrash className="text-xl text-red-500" />
                </button>
            </div>
        </div>
    )
}

export default TaskItem
