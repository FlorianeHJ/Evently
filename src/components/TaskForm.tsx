import { Task } from '@/types' // Assurez-vous que le type est bien importé depuis le fichier types.ts
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface TaskFormProps {
    addTask: (task: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<string>('Nourriture')
    const [priority, setPriority] = useState<'Basse' | 'Haute'>('Basse')

    const togglePriority = () => {
        setPriority(priority === 'Haute' ? 'Basse' : 'Haute')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title) return

        const newTask: Task = {
            id: Date.now(),
            title,
            category,
            priority,
            completed: false,
        }

        addTask(newTask)
        setTitle('')
        setCategory('Nourriture')
        setPriority('Basse')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-4 p-4 bg-gray-100 rounded-lg"
        >
            <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                    Titre de la tâche
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Entrez une tâche"
                />
            </div>

            <div className="flex space-x-3 mb-3">
                <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">
                        Catégorie
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option>Nourriture</option>
                        <option>Invités</option>
                        <option>Décoration</option>
                        {/* autres catégories */}
                    </select>
                </div>

                <div className="flex items-center">
                    <label className="text-sm font-semibold mr-2">
                        Priorité
                    </label>
                    <button
                        type="button"
                        onClick={togglePriority}
                        className="focus:outline-none"
                    >
                        <FaStar
                            className={`text-2xl ${
                                priority === 'Haute'
                                    ? 'text-highlight'
                                    : 'text-gray-300'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-highlight text-white rounded hover:bg-highlight/80"
            >
                Ajouter la tâche
            </button>
        </form>
    )
}

export default TaskForm
