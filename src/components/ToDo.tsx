import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import Image from 'next/image'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
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
    const [sortOption, setSortOption] = useState<
        'alphabetical' | 'priority' | 'category'
    >('alphabetical')
    const [categories, setCategories] = useState<string[]>([
        'Nourriture',
        'Invités',
        'Décoration',
    ])

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

    const reactivateTask = (taskId: number) => {
        const taskToReactivate = completedTasks.find(
            (task) => task.id === taskId
        )
        if (taskToReactivate) {
            setCompletedTasks(
                completedTasks.filter((task) => task.id !== taskId)
            )
            setTasks([...tasks, { ...taskToReactivate, completed: false }])
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

    // Tri des tâches
    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortOption === 'alphabetical') return a.title.localeCompare(b.title)
        if (sortOption === 'priority')
            return a.priority === 'Haute' && b.priority === 'Basse' ? -1 : 1
        if (sortOption === 'category')
            return a.category.localeCompare(b.category)
        return 0
    })

    return (
        <div className="w-full p-4 rounded-lg shadow-xl bg-background">
            {/* Message pour liste de tâches vide */}
            {tasks.length === 0 && !isFormOpen && (
                <div className="flex flex-col gap-10 justify-center items-center">
                    <p className="text-center mt-4">
                        Oops ! Vous n'avez pas encore créé de tâches... Cliquez
                        sur "Créer une tâche" pour commencer !
                    </p>
                    <Image
                        src={oops}
                        alt="emoji oops"
                        width={200}
                        className="mb-8"
                    />
                    <button className="btn" onClick={toggleForm}>
                        Créer une tâche
                    </button>
                </div>
            )}

            {/* Bouton ajouter lorsque des tâches existent */}
            {tasks.length > 0 && (
                <div className="flex justify-end items-center mb-4">
                    <button
                        className={` text-3xl  transform transition-transform duration-600 ${
                            isFormOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                        onClick={toggleForm}
                        title={
                            isFormOpen
                                ? 'Fermer le formulaire'
                                : 'Ajouter une tâche'
                        }
                    >
                        <FaPlus />
                    </button>
                </div>
            )}

            {/* Formulaire d'ajout ou de modification */}
            {isFormOpen && (
                <TaskForm
                    addTask={addTask}
                    initialTask={editingTask}
                    categories={categories}
                />
            )}

            {/* Filtre pour trier les tâches (affiché uniquement s'il y a des tâches en cours) */}
            {tasks.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold">
                        Trier par :
                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(
                                    e.target.value as
                                        | 'alphabetical'
                                        | 'priority'
                                        | 'category'
                                )
                            }
                            className="ml-2 p-1 rounded border text-sm"
                        >
                            <option value="alphabetical">
                                Ordre Alphabétique
                            </option>
                            <option value="priority">Priorité</option>
                            <option value="category">Catégorie</option>
                        </select>
                    </label>
                </div>
            )}

            {/* Liste des tâches */}
            <div className="space-y-3 mt-4">
                {sortedTasks.map((task) => (
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
                    <h3 className="text-xl font-semibold mb-4 text-primary">
                        Tâches Terminées
                    </h3>
                    <div className="space-y-3">
                        {completedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={() => deleteTask(task.id)}
                                onReactivate={() => reactivateTask(task.id)}
                                isCompleted
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
