'use client'

import { useState } from 'react'

const page = () => {
    const [eventName, setEventName] = useState('Evénement Exemple')
    const [eventImage, setEventImage] = useState(
        'https://via.placeholder.com/150'
    ) // Remplace par l'URL de l'image de l'événement
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
        'Todo',
        'Calendrier',
        'Budget',
        'Invités',
        'Inspiration',
    ])

    return (
        <section className="flex">
            {/* Barre de navigation  */}
            <nav className="w-52 bg-background2/80 p-6 flex flex-col items-center">
                <div className="w-24 h-24 mb-4">
                    <img
                        src={eventImage}
                        alt="Image de l'événement"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

                <h2 className="text-xl tracking-wide font-secondary text-center mb-6">
                    {eventName}
                </h2>

                <div className="flex flex-col w-full">
                    {selectedFeatures.map((feature, index) => (
                        <button
                            key={index}
                            className="btn w-full mb-3 text-left"
                        >
                            {feature}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Section principale du dashboard */}
            <main className="flex-1 p-6 bg-background">
                <h1 className="text-4xl tracking-wide font-secondary mb-4">
                    Dashboard
                </h1>
                <p>
                    En construction... les aperçus de fonctionnalités
                    s'ajouterons ici.
                </p>
            </main>
        </section>
    )
}

export default page
