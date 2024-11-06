'use client'

import Budget from '@/components/Budget'
import Calendar from '@/components/Calendar'
import Guests from '@/components/Guests'
import ToDo from '@/components/ToDo'
import Link from 'next/link' // Import du composant Link
import { useState } from 'react'

const Page = () => {
    const [eventName, setEventName] = useState('Evénement Exemple')
    const [eventImage, setEventImage] = useState(
        'https://via.placeholder.com/150'
    ) // Remplace par l'URL de l'image de l'événement
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
        'Tableau de bord',
        'To-do List',
        'Calendrier',
        'Budget',
        'Invités',
        'Inspiration',
    ])
    const [activeFeature, setActiveFeature] = useState<string | null>(null)

    const renderFeatureComponent = () => {
        switch (activeFeature) {
            case 'To-do List':
                return <ToDo />
            case 'Calendrier':
                return <Calendar />
            case 'Budget':
                return <Budget />
            case 'Invités':
                return <Guests />
            default:
                return <p>Affichages des différentes fonctionnalités</p>
        }
    }

    return (
        <section className="flex">
            {/* Barre de navigation */}
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
                    {selectedFeatures.map((feature, index) =>
                        feature === 'Inspiration' ? (
                            <Link href="/inspiration" key={index}>
                                <button
                                    className={`btn w-full mb-3 text-left ${
                                        activeFeature === feature
                                            ? ''
                                            : 'bg-primary '
                                    } `}
                                >
                                    {feature}
                                </button>
                            </Link>
                        ) : (
                            <button
                                key={index}
                                onClick={() =>
                                    setActiveFeature(
                                        feature === 'Tableau de bord'
                                            ? null
                                            : feature
                                    )
                                }
                                className={`btn w-full mb-3 text-left ${
                                    activeFeature === feature ||
                                    (feature === 'Tableau de bord' &&
                                        activeFeature === null)
                                        ? ''
                                        : 'bg-primary'
                                } `}
                            >
                                {feature}
                            </button>
                        )
                    )}
                </div>
            </nav>

            {/* Section principale du tableau de bord */}
            <main className="flex-1 p-6 bg-background">
                <h1 className="text-4xl tracking-wide font-secondary mb-4">
                    {activeFeature || 'Tableau de bord'}
                </h1>
                {renderFeatureComponent()}
            </main>
        </section>
    )
}

export default Page
