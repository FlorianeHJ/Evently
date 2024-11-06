import Image from 'next/image'
import logo from '../assets/Evently.png'

const Headers = () => {
    return (
        <div className="flex justify-between items-center bg-primary p-2">
            <div className="">
                <Image
                    src={logo}
                    alt="logo"
                    className="rounded-full"
                    width={52}
                    height={52}
                />
            </div>
            <div className="">
                <button className="btn">S'inscrire</button>
                <button className="btn ml-3">Se connecter</button>
            </div>
        </div>
    )
}

export default Headers
