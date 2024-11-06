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
                    <a href="#" className="hover:shadow-lg">
                        <span>Formulaire de contact</span>
                    </a>
                    <a
                        href="mailto:fjulia.dev@gmail.com"
                        className="hover:shadow-lg"
                    >
                        <span>Mail</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Téléphone</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Adresse</span>
                    </a>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <h2 className="font-secondary tracking-widest text-lg pb-1">
                        Nous suivre
                    </h2>
                    <a href="#" className="hover:shadow-lg">
                        <span>Facebook</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Twitter</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Instagram</span>
                    </a>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <h2 className="font-secondary tracking-widest text-lg pb-1">
                        Aide
                    </h2>
                    <a href="#" className="hover:shadow-lg">
                        <span>FAQ</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Inspiration</span>
                    </a>
                    <a href="#" className="hover:shadow-lg">
                        <span>Mentions légales</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
