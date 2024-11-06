import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import { useState } from 'react'

// Type pour définir une tâche
interface Task {
    id: number
    title: string
    category: string
    priority: 'Basse' | 'Haute'
    completed: boolean
}

const ToDoList = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Réserver le traiteur',
            category: 'Nourriture',
            priority: 'Haute',
            completed: false,
        },
        {
            id: 2,
            title: 'Envoyer les invitations',
            category: 'Invités',
            priority: 'Basse',
            completed: false,
        },
    ])
    const [isFormOpen, setIsFormOpen] = useState(false)

    const toggleForm = () => setIsFormOpen(!isFormOpen)

    const addTask = (newTask: Task) => {
        setTasks([...tasks, newTask])
        setIsFormOpen(false)
    }

    return (
        <div className="w-full max-w-5xl p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                    onClick={toggleForm}
                >
                    {isFormOpen ? 'Annuler' : 'Ajouter une Tâche'}
                </button>
            </div>

            {isFormOpen && <TaskForm addTask={addTask} />}

            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default ToDoList
