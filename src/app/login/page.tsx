const Login = () => {
    return (
        <section className="flex flex-col items-center px-4 py-12">
            <h1 className="font-secondary text-4xl pb-10">
                Connexion / Inscription
            </h1>
            <div className="flex flex-row gap-10">
                {/* Formulaire de connexion */}
                <div className="bg-background2/70 p-5 rounded-md w-1/2">
                    <span>Vous avez déjà un compte ?</span>
                    <h2 className="text-2xl font-semibold mb-4">
                        Connectez-vous !
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1">
                                Identifiant ou adresse e-mail
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Votre identifiant ou e-mail"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Votre mot de passe"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <span className="text-sm text-gray-500 cursor-pointer hover:underline">
                            Identifiant/mot de passe oublié ?
                        </span>
                        <button type="submit" className="btn">
                            Se connecter
                        </button>
                    </form>
                </div>

                {/* Formulaire d'inscription */}
                <div className="bg-background2/70 p-5 rounded-md w-1/2">
                    <span>Vous n'avez pas encore de compte ?</span>
                    <h2 className="text-2xl font-semibold mb-4">
                        Inscrivez-vous !
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="signup-email"
                                className="block mb-1"
                            >
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                id="signup-email"
                                placeholder="Votre adresse e-mail"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="signup-password"
                                className="block mb-1"
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="signup-password"
                                placeholder="Créez un mot de passe"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block mb-1"
                            >
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirmez votre mot de passe"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <button type="submit" className="btn ">
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
