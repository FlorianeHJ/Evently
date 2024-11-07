import { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { Task } from '../../types'

interface TaskFormProps {
    addTask: (task: Task) => void
    initialTask?: Task | null
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, initialTask }) => {
    // États pour les champs du formulaire, initialisés avec les données de `initialTask` si présentes
    const [title, setTitle] = useState<string>(initialTask?.title || '')
    const [category, setCategory] = useState<string>(
        initialTask?.category || ''
    )
    const [priority, setPriority] = useState<'Basse' | 'Haute'>(
        initialTask?.priority || 'Basse'
    )
    const [note, setNote] = useState<string>(initialTask?.note || '')
    const [errors, setErrors] = useState<{ title?: string; category?: string }>(
        {}
    )

    // Fonction pour basculer entre "Haute" et "Basse" priorité
    const togglePriority = () => {
        setPriority(priority === 'Haute' ? 'Basse' : 'Haute')
    }

    // Vérifie les champs obligatoires et retourne les erreurs, s'il y en a
    const validateFields = () => {
        const newErrors: { title?: string; category?: string } = {}
        if (!title) newErrors.title = 'Veuillez remplir ce champ'
        if (!category)
            newErrors.category = 'Veuillez sélectionner une catégorie'
        return newErrors
    }

    // Soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const newTask: Task = {
            id: initialTask ? initialTask.id : Date.now(), // Utilise l'ID existant en mode modification
            title,
            category,
            priority,
            completed: initialTask ? initialTask.completed : false,
            note,
        }

        addTask(newTask) // Ajoute ou met à jour la tâche
        resetForm()
    }

    // Réinitialise le formulaire
    const resetForm = () => {
        setTitle('')
        setCategory('')
        setPriority('Basse')
        setNote('')
        setErrors({})
    }

    // Réinitialise les champs si `initialTask` change (utile pour la modification)
    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title)
            setCategory(initialTask.category)
            setPriority(initialTask.priority)
            setNote(initialTask.note || '')
        }
    }, [initialTask])

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mb-4 p-4 rounded-lg"
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
                    className="w-full p-2 border rounded outline-none text-sm"
                    placeholder="Entrez une tâche"
                />
                {errors.title && (
                    <p className="text-red-500 text-xs py-1 italic">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Champ Catégorie */}
            <div>
                <label className="block text-sm font-semibold mb-1">
                    Catégorie
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded outline-none text-sm"
                >
                    <option value="">--Sélectionner--</option>
                    <option value="Nourriture">Nourriture</option>
                    <option value="Invités">Invités</option>
                    <option value="Décoration">Décoration</option>
                    <option value="Autre">Autre</option>
                </select>
                {errors.category && (
                    <p className="text-red-500 text-xs py-1 italic">
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
                        <FaStar className="text-2xl" />
                    ) : (
                        <FaRegStar className="text-2xl text-gray-300" />
                    )}
                </button>
            </div>

            {/* Champ Note */}
            <div>
                <label className="block text-sm font-semibold mb-1">Note</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded outline-none text-sm"
                    placeholder="Ajouter une note"
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
