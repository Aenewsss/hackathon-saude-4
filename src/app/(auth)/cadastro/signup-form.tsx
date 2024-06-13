'use client'

import { signup } from "@/app/actions/auth"
import { SubmitButton } from "@/app/components/Buttons/submit-button"
import { useFormState, useFormStatus } from "react-dom"

export default function SignUpForm() {

    const [state, action] = useFormState(signup, undefined)

    return (
        <form action={action}>
            <div className="flex gap-2 flex-col min-w-[300px]">
                <label htmlFor="email">E-mail</label>
                <input required className="border border-gray-400 rounded px-2 py-1" id="email" name="email" />
            </div>

            <div className="flex gap-2 flex-col min-w-[300px]">
                <label htmlFor="password">Senha</label>
                <input required className="border border-gray-400 rounded px-2 py-1" id="password" name="password" type="password" />
            </div>
            <div className="flex gap-2 flex-col min-w-[300px]">
                <label htmlFor="confirm-password">Repetir Senha</label>
                <input required className="border border-gray-400 rounded px-2 py-1" id="confirm-password" name="confirm-password" type="password" />
            </div>

            {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

            <SubmitButton />
        </form>
    )
}