import ProfileForm from "./profile-form";
import LinkBack from "./link-back";

export default function Page() {
    return (
        <main className="bg-beige flex flex-col gap-8 md:px-0 p-4">
            <LinkBack />
            <h1 className="text-blue-700 text-4xl">Meu Perfil</h1>

            <ProfileForm />
        </main>
    )
}