import Image from 'next/image'
import laptop from '../assets/laptop.webp'

const page = () => {
    return (
        <section className="p-4">
            {/* Section courte description de l'app */}
            <div>
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 gap-10 justify-center">
                        <h1 className="font-secondary text-background2 text-4xl">
                            Evently
                        </h1>
                        <p className="text-justify">
                            Transformez vos idées en événements mémorables avec
                            Evently ! Que ce soit un anniversaire, un mariage ou
                            une réunion, notre application vous accompagne à
                            chaque étape. Organisez, planifiez et gérez tous les
                            aspects de votre événement depuis un tableau de bord
                            centralisé, conçu pour vous simplifier la vie.
                        </p>
                        <div>
                            <button className="btn">
                                Débutez votre aventure événementielle !
                            </button>
                        </div>
                    </div>
                    <div>
                        <Image src={laptop} alt="logo" />
                    </div>
                </div>
            </div>
            {/* Section aperçu des fonctionnalités */}
            <div className="mt-12">
                <h2 className="font-secondary text-background2 text-4xl py-4">
                    Les fonctionnalités personnalisées d'Evently
                </h2>
            </div>
        </section>
    )
}

export default page
