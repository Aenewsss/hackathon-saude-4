'use client'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import Image from "next/image"
import { auth } from "../lib/firebase";

export default function SocialSignIn() {

    const provider = new GoogleAuthProvider()

    async function singIn() {
        signInWithPopup(auth, provider) .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            // storageService.setItem(UserEnum.USER_NAME, user.displayName)
            // storageService.setItem(UserEnum.USER_EMAIL, user.email)
            // storageService.setItem(UserEnum.USER_ID, user.uid)

            // await Firebase.addUserToDatabase(user.uid, user.displayName || '')

            window.location.assign('/')
        }).catch((error) => {
            console.error('error:', error)
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
        
    }

    return (
        <div className="flex flex-col gap-4">
            <button onClick={singIn} className="px-3 py-2 flex gap-4 rounded-md border items-center self-start bg-black text-white">
                <Image width={30} height={30} src="/icons/google.svg" alt="Ícone Google" />
                Continuar com Google
            </button>
        </div>
    )
}