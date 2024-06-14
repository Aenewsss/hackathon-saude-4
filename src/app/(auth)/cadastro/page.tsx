import SocialSignIn from "../social-signin";
import SignUpForm from "./signup-form";

export default function Page() {
    
    return(
        <main className="container mx-auto flex flex-col gap-8 md:px-0 px-4 my-8">
            <h1>Crie sua conta em segundos</h1>

            {/* <SignUpForm />            
            <p>Ou faça o cadastro com</p> */}
            <SocialSignIn />
        </main>
    )
}