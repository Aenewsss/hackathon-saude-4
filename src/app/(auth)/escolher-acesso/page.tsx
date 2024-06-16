'use client'
import { UserEnum } from "@/enums";
import { storageService } from "@/services/storage.service";
import { userService } from "@/services/user.service";
import Image from "next/image";
import { useState } from "react";

export default function Page() {

    const [SelectedIndex, setSelectedIndex] = useState(-1);

    async function saveProfileType() {
        const profileType = SelectedIndex == 0 ? 'patient' : SelectedIndex == 1 ? 'healthcare_professional' : 'hospital_unit'

        const userId = storageService.getItem(UserEnum.USER_ID)

        const { data } = await userService.updateProfileType(userId, profileType)

        window.location.assign(`/perfil`)
    }

    return (
        <main className="bg-beige min-h-screen flex items-center justify-center md:px-0 px-4">
            <div className="bg-stone-300 p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
                <Image className="mb-4" src="/logo.svg" alt="Logo" width={120} height={120} />
                <p className="text-blue-700 mb-4 text-xl font-semibold">Escolha seu tipo de acesso:</p>
                <div className="flex flex-col gap-2 w-full">
                    <button onClick={_ => setSelectedIndex(0)} className={`text-white py-2 rounded-md ${SelectedIndex == 0 ? 'bg-blue-950' : 'bg-blue-700'}`}>Paciente</button>
                    <button onClick={_ => setSelectedIndex(1)} className={`text-white py-2 rounded-md ${SelectedIndex == 1 ? 'bg-blue-950' : 'bg-blue-700'}`}>Profissional de Saúde</button>
                    <button onClick={_ => setSelectedIndex(2)} className={`text-white py-2 rounded-md ${SelectedIndex == 2 ? 'bg-blue-950' : 'bg-blue-700'}`}>Hospital</button>
                </div>
                <span className="text-red-600 text-sm mt-4">* Não é possível alterar após a seleção, então escolha com atenção</span>
                <button disabled={SelectedIndex == -1} onClick={saveProfileType} className={`text-white py-2 w-full rounded-md bg-blue-700 mt-8 ${SelectedIndex != -1 ? 'opacity-100' : 'opacity-40'}`}>Salvar Escolha</button>
            </div>


        </main>
    )
}