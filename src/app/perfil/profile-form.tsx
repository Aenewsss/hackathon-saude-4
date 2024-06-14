'use client'

import { useFormState } from "react-dom"
import { saveProfile } from "../actions/profile.action"
import { SubmitButton } from "../components/Buttons/submit-button"
import { useEffect, useState } from "react"
import { storageService } from "@/services/storage.service"
import { UserEnum } from "@/enums"
import { userService } from "@/services/user.service"
import { ICoords, IUser } from "@/interfaces"

export default function ProfileForm() {

    const [state, action] = useFormState(saveProfile, undefined)

    const [User, setUser] = useState<IUser>();
    const [UserId, setUserId] = useState();
    const [BirthdateFormatted, setBirthdateFormatted] = useState('0000-00-00');
    const [Coords, setCoords] = useState<ICoords>();

    useEffect(() => {
        getCurrentLocation()
        getData()
    }, []);

    useEffect(() => {
        if (state?.error) alert('Erro')
        if (state?.data) window.location.reload()
    }, [state]);



    async function getCurrentLocation() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }))
        else alert("Seu navegador não suporta nossos serviços de geolocalização")
    }

    async function getData() {
        const userId = storageService.getItem(UserEnum.USER_ID)
        setUserId(userId)

        const { data } = await userService.getUser(userId)

        setUser(data)

        const date = new Date(data.birthdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        setBirthdateFormatted(`${year}-${month}-${day}`)
    }



    if (!User) return <p>Carregando...</p>

    return (
        <form action={action}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Nome</label>
                <input
                    defaultValue={User.name}
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 w-full border rounded-md border-gray-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="birthdate" className="block text-gray-700">Data de nascimento</label>
                <input
                    defaultValue={BirthdateFormatted}
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="mt-1 p-2 w-full border rounded-md border-gray-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="profile-type" className="block text-gray-700">Tipo de acesso</label>
                {
                    !User.profileType
                        ? <select
                            id="profile-type"
                            name="profile-type"
                            className="mt-1 p-2 w-full border rounded-md border-gray-500"
                            required
                        >
                            <option value="patient">Paciente</option>
                            <option value="hospital_unit">Unidade Hospitalar</option>
                            <option value="healthcare_professional">Profissional da Saúde</option>
                        </select>
                        : <input
                            defaultValue={User.profileType}
                            type="text"
                            id="profile-type"
                            name="profile-type"
                            readOnly
                            className="mt-1 p-2 w-full border rounded-md border-gray-500 opacity-80"
                        />
                }

                <input defaultValue={UserId} type="text" name="id" hidden />
                <input defaultValue={Coords?.latitude} type="text" name="latitude" hidden />
                <input defaultValue={Coords?.longitude} type="text" name="longitude" hidden />
            </div>
            <SubmitButton />
        </form>
    )
}