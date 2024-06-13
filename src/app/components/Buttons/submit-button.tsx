'use client'
import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className="px-3 py-2 bg-blue-500 text-white rounded-md mt-4" disabled={pending}>{pending ? 'Carregando...' : 'Registrar'}</button>
  )
}