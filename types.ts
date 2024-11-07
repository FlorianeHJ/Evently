// Définition unique du type Task avec les deux priorités disponibles
export interface Task {
    id: number
    title: string
    category: string
    priority: 'Basse' | 'Haute'
    completed: boolean
    note?: string
}
