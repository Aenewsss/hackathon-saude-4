import Link from "next/link";
import ProfileForm from "./profile-form";

export default function Page() {
    return (
        <main className="container mx-auto flex flex-col gap-8 md:px-0 px-4 my-8">
            <Link href="/" className="text-blue-400">← Voltar</Link>
            
            <h1 className="text-4xl">Meu Perfil</h1>            

            <ProfileForm />
        </main>
    )
}