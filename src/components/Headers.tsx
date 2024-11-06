'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaBell, FaCog } from 'react-icons/fa'
import logo from '../assets/Evently.png'

const Headers = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Fonction pour simuler la connexion/déconnexion
    const toggleLogin = () => {
        setIsLoggedIn((prevState) => !prevState)
    }

    return (
        <div className="flex justify-between items-center bg-primary/50 p-2">
            <div className="">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        className="rounded-full"
                        width={52}
                        height={52}
                    />
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {/* Bouton pour simuler la connexion/déconnexion */}
                <button onClick={toggleLogin} className="btn">
                    {isLoggedIn ? 'Se déconnecter' : 'Se connecter'}
                </button>

                {isLoggedIn ? (
                    <>
                        <Link href="/events">
                            <button className="btn">Mes évènements</button>
                        </Link>
                        <Link href="/profil">
                            <button className="btn">Profil</button>
                        </Link>
                        <Link href="/">
                            <button className="text-2xl">
                                <FaBell />
                            </button>
                        </Link>
                        <Link href="/">
                            <button className=" text-2xl">
                                <FaCog />
                            </button>
                        </Link>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="btn ml-3">Connexion</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Headers
