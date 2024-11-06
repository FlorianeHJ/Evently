import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/Evently.png'

const Headers = () => {
    return (
        <div className="flex justify-between items-center bg-primary p-2">
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
            <div>
                <Link href="/login">
                    <button className="btn">Connexion</button>
                </Link>
            </div>
        </div>
    )
}

export default Headers
