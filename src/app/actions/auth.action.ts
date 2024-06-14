import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { redirect } from "next/navigation"
import { createSession } from "../lib/session"

export async function signup(state: any, formData: FormData) {
    const email = formData.get('email')?.toString()!
    const password = formData.get('password')?.toString()!
    const confirmPassword = formData.get('confirm-password')?.toString()!

    if (password != confirmPassword) return { error: 'As senhas devem ser iguais', data: null }

    try {
        await createUserWithEmailAndPassword(auth, email, password)
        redirect('/')
    } catch (e: any) {
        return { error: e.message, data: null }
    }
}

export async function signin(state: any, formData: FormData) {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) return { error: 'E-mail ou senha incorretos' }

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        await createSession(user.uid)
    } catch (e) {
        return { error: 'E-mail ou senha incorretos' }
    }

    redirect('/admin')
}