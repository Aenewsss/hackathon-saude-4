'use client'

import { useFormState } from "react-dom"
import { saveProfile } from "../actions/profile.action"
import { SubmitButton } from "../components/Buttons/submit-button"
import { useEffect, useState } from "react"
import { storageService } from "@/services/storage.service"
import { StorageKeysEnum, UserEnum } from "@/enums"
import { userService } from "@/services/user.service"
import { ICoords, IUser } from "@/interfaces"
import { healthInsuranceService } from "@/services/health-insurance.service"
import { GetProfileName } from "@/utils/get-profile-name.util"
import PatientInputs from "./patient-inputs"
import HospitalInputs from "./hospital-inputs"
import ProfessionalInputs from "./professional-inputs"

export default function ProfileForm() {

    const [state, action] = useFormState(saveProfile, undefined)

    const [User, setUser] = useState<IUser>();
    const [UserId, setUserId] = useState();
    const [Coords, setCoords] = useState<ICoords>();
    const [HealthInsurance, setHealthInsurance] = useState<string[]>();

    useEffect(() => {
        getCurrentLocation()
        getUserData()
        getHealthInsurances()
    }, []);

    useEffect(() => {
        if (state?.error) alert('Erro')
        if (state?.data) {
            storageService.setItem(StorageKeysEnum.USER_PROFILE_TYPE, state.data.profileType)
            window.location.reload()
        }
    }, [state]);

    async function getHealthInsurances() {
        const { data } = await healthInsuranceService.listAll()
        setHealthInsurance(data)
    }

    async function getCurrentLocation() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }))
        else alert("Seu navegador não suporta nossos serviços de geolocalização")
    }

    async function getUserData() {
        const userId = storageService.getItem(UserEnum.USER_ID)
        setUserId(userId)

        const { data } = await userService.getById(userId)
        setUser(data)
    }

    if (!User) return <p>Carregando...</p>

    return (
        <form action={action}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-blue-700 text-lg font-semibold">Nome</label>
                <input
                    defaultValue={User.name}
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Plano de Saúde</label>
                <span>* Apenas selecione se possuir vínculo com plano de saúde</span>

                <div className="flex flex-wrap gap-y-4 mt-4">
                    {
                        HealthInsurance?.map((el, index) => (
                            <div key={index} className="flex flex-1 gap-2 min-w-[160px] items-center">
                                <input defaultChecked={User?.healthInsurance?.find(health => health == el) ? true : false} id={el} name='health-insurance' value={el} type="checkbox" />
                                <label htmlFor={el}>{el}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="profile-type" className="block text-blue-700 text-lg font-semibold">Tipo de acesso</label>
                {
                    !User.profileType
                        ? <select
                            id="profile-type"
                            name="profile-type"
                            className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                            required
                        >
                            <option value="patient">Paciente</option>
                            <option value="hospital_unit">Unidade Hospitalar</option>
                            <option value="healthcare_professional">Profissional da Saúde</option>
                        </select>
                        : <>
                            <input
                                defaultValue={GetProfileName(User.profileType)}
                                type="text"
                                readOnly
                                name="profile-readonly"
                                className="mt-1 p-2 w-full border rounded-md bg-stone-300 opacity-50 capitalize"
                            />
                            <input
                                defaultValue={User.profileType}
                                type="text"
                                id="profile-type"
                                name="profile-type"
                                readOnly
                                hidden
                                className="mt-1 p-2 w-full border rounded-md bg-stone-300 opacity-50 capitalize"
                            />
                        </>
                }

                <input defaultValue={UserId} type="text" name="id" hidden />
                <input defaultValue={Coords?.latitude} type="text" name="latitude" hidden />
                <input defaultValue={Coords?.longitude} type="text" name="longitude" hidden />
            </div>

            {
                User.profileType == 'patient'
                    ? <PatientInputs user={User} />
                    : User.profileType == 'healthcare_professional'
                        ? <ProfessionalInputs id={UserId} />
                        : <HospitalInputs id={UserId} />
            }

            <SubmitButton />
        </form>
    )
}