import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import Image from 'next/image'
import { useState } from 'react'
import oops from '../assets/oops.png'

// Type pour définir une tâche
interface Task {
    id: number
    title: string
    category: string
    priority: 'Basse' | 'Haute'
    completed: boolean
    note?: string
}

const Page = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen)
        setEditingTask(null)
    }

    const addTask = (newTask: Task) => {
        if (editingTask) {
            setTasks(
                tasks.map((task) =>
                    task.id === editingTask.id ? newTask : task
                )
            )
            setEditingTask(null)
        } else {
            setTasks([...tasks, newTask])
        }
        setIsFormOpen(false)
    }

    const completeTask = (taskId: number) => {
        const taskToComplete = tasks.find((task) => task.id === taskId)
        if (taskToComplete) {
            setTasks(tasks.filter((task) => task.id !== taskId))
            setCompletedTasks([
                ...completedTasks,
                { ...taskToComplete, completed: true },
            ])
        }
    }

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId))
    }

    const editTask = (task: Task) => {
        setEditingTask(task)
        setIsFormOpen(true)
    }

    return (
        <div className="w-full p-4 rounded-lg shadow-md bg-background">
            {/* Message pour liste de tâches vide */}
            {tasks.length === 0 && !isFormOpen && (
                <div className="flex flex-col gap-10 justify-center items-center">
                    <p className="text-center mt-4">
                        Oops ! Vous n'avez pas encore créé de tâches... Cliquez
                        sur "Ajouter une tâche" pour commencer !
                    </p>
                    <Image
                        src={oops}
                        alt="emoji oops"
                        width={200}
                        className="mb-8"
                    />
                </div>
            )}

            {/* Liste des tâches */}
            <div className="space-y-3 mt-4">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={() => completeTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onEdit={() => editTask(task)}
                    />
                ))}
            </div>

            {/* Liste des tâches terminées */}
            {completedTasks.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">
                        Tâches Terminées
                    </h3>
                    <div className="space-y-3">
                        {completedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={() => deleteTask(task.id)}
                                isCompleted
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Affiche le formulaire si isFormOpen est true */}
            {isFormOpen && (
                <TaskForm addTask={addTask} initialTask={editingTask} />
            )}

            {/* Bouton pour ouvrir/fermer le formulaire */}
            <div className="flex justify-center items-center m-4">
                <button className="btn" onClick={toggleForm}>
                    {isFormOpen ? 'Annuler' : 'Ajouter une tâche'}
                </button>
            </div>
        </div>
    )
}

export default Page
