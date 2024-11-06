import Image from 'next/image'
import logo from '../assets/Evently.png'

const Footer = () => {
    return (
        <footer className="absolute bg-primary w-full hidden sm:block p-2">
            <div className="flex flex-row justify-around items-center">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="logo"
                        className="rounded-full"
                        width={90}
                    />
                    <span className="text-xs italic py-2">
                        ©2024 Floriane HJ tous droits réservés{' '}
                    </span>
                </div>
                <div className="flex flex-col text-sm">
                    <h2 className="font-secondary tracking-widest text-lg pb-1">
                        Nous contacter
                    </h2>
                    <span>Formulaire de contact</span>
                    <span>Mail</span>
                    <span>Téléphone</span>
                    <span>Adresse</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <h2 className="font-secondary tracking-widest text-lg pb-1">
                        Nous suivre
                    </h2>
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Instagram</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <h2 className="font-secondary tracking-widest text-lg pb-1">
                        Aide
                    </h2>
                    <span>FAQ</span>
                    <span>Inspiration</span>
                    <span>Mentions légales</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
