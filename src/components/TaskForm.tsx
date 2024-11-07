import { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { Task } from '../../types'

interface TaskFormProps {
    addTask: (task: Task) => void
    initialTask?: Task | null
    categories: string[]
}

const TaskForm: React.FC<TaskFormProps> = ({
    addTask,
    initialTask,
    categories,
}) => {
    const [title, setTitle] = useState<string>(initialTask?.title || '')
    const [category, setCategory] = useState<string>(
        initialTask?.category || ''
    )
    const [priority, setPriority] = useState<'Basse' | 'Haute'>(
        initialTask?.priority || 'Basse'
    )
    const [note, setNote] = useState<string>(initialTask?.note || '')
    const [dueDate, setDueDate] = useState<string>(initialTask?.dueDate || '') // État pour la date d'échéance
    const [errors, setErrors] = useState<{ title?: string; category?: string }>(
        {}
    )

    const togglePriority = () => {
        setPriority(priority === 'Haute' ? 'Basse' : 'Haute')
    }

    const validateFields = () => {
        const newErrors: { title?: string; category?: string } = {}
        if (!title) newErrors.title = 'Veuillez remplir ce champ'
        if (!category)
            newErrors.category = 'Veuillez sélectionner une catégorie'
        return newErrors
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const newTask: Task = {
            id: initialTask ? initialTask.id : Date.now(),
            title,
            category,
            priority,
            completed: initialTask ? initialTask.completed : false,
            note,
            dueDate, // Inclure la date d'échéance dans la nouvelle tâche
        }

        addTask(newTask)
        resetForm()
    }

    const resetForm = () => {
        setTitle('')
        setCategory('')
        setPriority('Basse')
        setNote('')
        setDueDate('') // Réinitialiser la date d'échéance

        setErrors({})
    }

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title)
            setCategory(initialTask.category)
            setPriority(initialTask.priority)
            setNote(initialTask.note || '')
            setDueDate(initialTask.dueDate || '') // Remplir la date d'échéance si elle est présente
        }
    }, [initialTask])

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mb-4 p-4 rounded-lg shadow-inner"
        >
            {/* Champ Titre */}
            <div>
                <label className="block text-sm font-semibold mb-1">
                    Tâche
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded outline-none text-xs"
                    placeholder="Entrez une tâche"
                />
                {errors.title && (
                    <p className="text-error text-xs py-1 italic">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Sélection de la catégorie */}
            <div>
                <label className="block text-sm font-semibold mb-1">
                    Catégorie
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=" w-full p-2 rounded outline-none text-xs"
                >
                    <option value="">--Sélectionner--</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-error text-xs py-1 italic">
                        {errors.category}
                    </p>
                )}
            </div>

            {/* Champ Priorité */}
            <div className="flex items-center">
                <label className="text-sm font-semibold mr-2">Priorité :</label>
                <button
                    type="button"
                    onClick={togglePriority}
                    className="focus:outline-none"
                >
                    {priority === 'Haute' ? (
                        <FaStar className="text-xl" />
                    ) : (
                        <FaRegStar className="text-xl " />
                    )}
                </button>
            </div>

            {/* Champ d'échéance */}
            <div>
                <label className="block text-sm font-semibold mb-1">
                    Échéance
                </label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 rounded outline-none text-xs"
                />
            </div>

            {/* Champ Note */}
            <div>
                <label className="block text-sm font-semibold mb-1">Note</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2  rounded outline-none text-xs"
                    placeholder="Ajoutez une note"
                    rows={6}
                />
            </div>

            {/* Bouton de soumission */}
            <div className="flex justify-center items-center">
                <button type="submit" className="btn">
                    {initialTask ? 'Modifier la tâche' : 'Ajouter une tâche'}
                </button>
            </div>
        </form>
    )
}

export default TaskForm
