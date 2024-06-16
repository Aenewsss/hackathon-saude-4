'use client'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import Image from "next/image"
import { auth } from "../lib/firebase";
import { userService } from "@/services/user.service";
import { storageService } from "@/services/storage.service";
import { UserEnum } from "@/enums";
import { createSession } from "../lib/session";
import { GetProfileName } from "@/utils/get-profile-name.util";

export default function SocialSignIn() {

    const provider = new GoogleAuthProvider()

    async function singIn() {
        signInWithPopup(auth, provider).then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const { uid, email, displayName } = result.user;

            storageService.setItem(UserEnum.USER_NAME, displayName)
            storageService.setItem(UserEnum.USER_EMAIL, email)
            storageService.setItem(UserEnum.USER_ID, uid)

            const { data } = await userService.getUser(uid)

            await createSession(uid)
            
            if (!data) {
                await userService.createUser(uid, email!, displayName!)
                return window.location.assign('/escolher-acesso')
            }

            const profileName = GetProfileName(data.profileType)

            window.location.assign(`/${profileName}`)
        }).catch((error) => {
            console.error('error:', error)
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

    }

    return (
        <button onClick={singIn} className="px-3 py-2 flex gap-4 rounded-md border items-center self-start bg-blue-700 text-white w-full">
            <Image width={30} height={30} src="/icons/google.svg" alt="Ícone Google" />
            Continuar com Google
        </button>
    )
}