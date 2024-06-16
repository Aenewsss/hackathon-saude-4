'use client'
import { screening } from "@/app/actions/screening.action";
import { SubmitButton } from "@/app/components/Buttons/submit-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function ScreeningForm({ id }: { id: string }) {

    const router = useRouter()

    const [state, action] = useFormState(screening, undefined)

    useEffect(() => {
        if (state?.error) alert(state.error)
        if (state?.data) router.push('/paciente/gestao-de-filas')
    }, [state]);

    return (
        <form action={action} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-blue-700 text-2xl font-bold mb-4">Triagem</h1>
            <div className="mb-4">
                <label htmlFor="symptoms" className="block text-blue-700 text-lg font-semibold">Sintomas</label>
                <input
                    type="text"
                    id="symptoms"
                    name="symptoms"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="illness" className="block text-blue-700 text-lg font-semibold">Possui alguma doença?</label>
                <input
                    type="text"
                    id="illness"
                    name="illness"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="temperature" className="block text-blue-700 text-lg font-semibold">Temperatura (°C)</label>
                <input
                    type="text"
                    id="temperature"
                    name="temperature"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="heart-hate" className="block text-blue-700 text-lg font-semibold">Frequência Cardíaca (bpm)</label>
                <input
                    type="text"
                    id="heart-hate"
                    name="heart-hate"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="blood-pressure" className="block text-blue-700 text-lg font-semibold">Pressão Arterial</label>
                <input
                    type="text"
                    id="blood-pressure"
                    name="blood-pressure"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Nível de urgência</label>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            id="urgency-1"
                            value="1"
                            name="urgency"
                            className="p-2 border rounded cursor-pointer"
                        />
                        <label className="cursor-pointer" htmlFor="urgency-1">Emergência</label>
                    </div>
                    <span className="block text-red-600 font-semibold mb-2">
                        Caso gravíssimo. O paciente necessita de atendimento imediato e possui risco de morte.
                    </span>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            id="urgency-2"
                            value="2"
                            name="urgency"
                            className="p-2 border rounded cursor-pointer"
                        />
                        <label className="cursor-pointer" htmlFor="urgency-2">Muito urgente</label>
                    </div>
                    <span className="block text-orange-600 font-semibold mb-2">
                        Caso grave. O paciente precisa de atendimento o mais prontamente possível.
                    </span>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            id="urgency-3"
                            value="3"
                            name="urgency"
                            className="p-2 border rounded cursor-pointer"
                        />
                        <label className="cursor-pointer" htmlFor="urgency-3">Urgente</label>
                    </div>
                    <span className="block text-yellow-600 font-semibold mb-2">
                        Caso de gravidade moderada, não considerada como emergência, pois o paciente possui condições clínicas para aguardar.
                    </span>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            id="urgency-4"
                            value="4"
                            name="urgency"
                            className="p-2 border rounded cursor-pointer"
                        />
                        <label className="cursor-pointer" htmlFor="urgency-4">Pouco Urgente</label>
                    </div>
                    <span className="block text-green-600 font-semibold mb-2">
                        Caso menos grave. Exige atendimento médico, mas o paciente pode ser assistido no consultório médico, de forma ambulatorial.
                    </span>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            id="urgency-5"
                            value="5"
                            name="urgency"
                            className="p-2 border rounded cursor-pointer"
                            defaultChecked
                        />
                        <label className="cursor-pointer" htmlFor="urgency-5">Não Urgente</label>
                    </div>
                    <span className="block text-blue-600 font-semibold mb-2">
                        Caso de menor complexidade e sem problemas recentes. O paciente deve ser atendido e acompanhado no consultório médico, no formato ambulatorial.
                    </span>
                </div>

            </div>
        
            <input hidden type="text" name="id" value={id} id={id} />
            <SubmitButton />
        </form>
    )
}