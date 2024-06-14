import SocialSignIn from "../social-signin";

export default function Page() {
    
    return(
        <main className="container mx-auto flex flex-col gap-8 md:px-0 px-4 my-8">
            <h1>Clique para fazer login</h1>

            <SocialSignIn />
        </main>
    )
}