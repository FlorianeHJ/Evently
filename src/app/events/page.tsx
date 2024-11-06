'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import oops from '../../assets/oops.png'
// Simulation de récupération d'événements depuis Firebase (pour l'instant c'est simulé avec un tableau)
const fetchUserEvents = () => {
    // À remplacer par l'appel à Firebase pour récupérer les événements de l'utilisateur
    return [] // Retourne un tableau vide pour l'instant, simuler qu'il n'y a pas d'événements
}

const page = () => {
    const [events, setEvents] = useState<any[]>([]) // Spécifier un type plus précis plus tard
    const [loading, setLoading] = useState<boolean>(true)

    // Simulation de la récupération des événements
    useEffect(() => {
        const getEvents = async () => {
            const userEvents = await fetchUserEvents()
            setEvents(userEvents)
            setLoading(false)
        }
        getEvents()
    }, [])

    if (loading) {
        return <div>Chargement...</div> // On pourrait ajouter un spinner ou une animation ici
    }

    return (
        <section className="flex flex-col items-center px-4 py-12">
            <h1 className="font-secondary text-4xl pb-10">Mes Événements</h1>

            {/* Si l'utilisateur n'a pas créé d'événements */}
            {events.length === 0 ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                        Oops ! Vous n'avez pas encore créé d'événements !
                    </h2>
                    <Image
                        src={oops}
                        alt="Représentation d'une personne qui est embarassée et/ou perdu"
                        width={150}
                        className="py-10"
                    />
                    <Link href="/new-event">
                        <button className="btn mt-4">
                            Créer un nouvel événement
                        </button>
                    </Link>
                </div>
            ) : (
                // Ici, tu affiches les événements si l'utilisateur en a
                <div>
                    {/* Boucle pour afficher les événements (ça sera personnalisé plus tard) */}
                    {events.map((event, index) => (
                        <div key={index} className="event-item">
                            <h3>{event.name}</h3>
                            <p>{event.date}</p>
                            {/* D'autres informations liées à l'événement */}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default page
