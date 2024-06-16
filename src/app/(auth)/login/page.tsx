import Image from "next/image";
import SocialSignIn from "../social-signin";

export default function Page() {

    return (
        <main className="bg-beige min-h-screen flex items-center justify-center md:px-0 px-4">
            <div className="bg-stone-300 p-4 rounded-lg shadow-lg flex flex-col items-center">
                <Image className="mb-4" src="/logo.svg" alt="Logo" width={120} height={120} />
                <p className="text-blue-700 text-center mb-6">Iniciaremos sessão ou criaremos uma conta, se ainda não tiver uma.</p>
                <div className="flex flex-col gap-4">
                    <SocialSignIn />
                    <button disabled className="bg-blue-500 text-white py-2 rounded-md opacity-60">Continuar com E-mail (em breve)</button>
                </div>
            </div>
        </main>
    )
}