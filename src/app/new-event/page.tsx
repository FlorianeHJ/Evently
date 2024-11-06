'use client'

import { useState } from 'react'

const page = () => {
    // State pour les informations générales
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventTheme, setEventTheme] = useState('')
    const [guestCount, setGuestCount] = useState('')
    const [budget, setBudget] = useState('')

    // State pour les fonctionnalités
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

    // Fonction pour ajouter ou supprimer une fonctionnalité
    const toggleFeature = (feature: string) => {
        setSelectedFeatures((prevState) =>
            prevState.includes(feature)
                ? prevState.filter((item) => item !== feature)
                : [...prevState, feature]
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Logique de soumission (envoi à l'API ou Firebase)
        console.log('Événement créé :', {
            eventName,
            eventDate,
            eventTime,
            eventLocation,
            eventTheme,
            guestCount,
            budget,
            selectedFeatures,
        })
    }

    return (
        <section className="flex flex-col items-center px-4 py-12">
            <h1 className="font-secondary text-4xl pb-10">
                Créer un Nouvel Événement
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-10 w-full max-w-3xl"
            >
                {/* Première partie : Informations générales */}
                <div className="bg-background2/40 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        Informations générales
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="event-name" className="block mb-1">
                            Nom de l'événement
                        </label>
                        <input
                            type="text"
                            id="event-name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Entrez le nom de l'événement"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="event-date" className="block mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                id="event-date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="event-time" className="block mb-1">
                                Heure
                            </label>
                            <input
                                type="time"
                                id="event-time"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-location" className="block mb-1">
                            Lieu
                        </label>
                        <input
                            type="text"
                            id="event-location"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Entrez le lieu de l'événement"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-theme" className="block mb-1">
                            Thème
                        </label>
                        <input
                            type="text"
                            id="event-theme"
                            value={eventTheme}
                            onChange={(e) => setEventTheme(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Entrez le thème de l'événement"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="guest-count" className="block mb-1">
                            Nombre d'invités
                        </label>
                        <input
                            type="number"
                            id="guest-count"
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Entrez le nombre d'invités"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="budget" className="block mb-1">
                            Budget
                        </label>
                        <input
                            type="number"
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Entrez le budget"
                        />
                    </div>
                </div>

                {/* Deuxième partie : Fonctionnalités */}
                <div className="bg-background2/40 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        Fonctionnalités
                    </h2>

                    <div className="flex flex-wrap gap-4 mb-4">
                        {[
                            'Todo',
                            'Calendrier',
                            'Budget',
                            'Invités',
                            'Inspiration',
                        ].map((feature) => (
                            <button
                                key={feature}
                                type="button"
                                onClick={() => toggleFeature(feature)}
                                className={`btn ${
                                    selectedFeatures.includes(feature)
                                        ? 'btnActive'
                                        : ' hover:bg-btnHover'
                                }`}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bouton de validation */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="btn py-2 px-6 rounded-lg shadow-lg"
                    >
                        Valider
                    </button>
                </div>
            </form>
        </section>
    )
}

export default page
