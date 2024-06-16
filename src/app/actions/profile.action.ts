'use server'

import { ICoords, ProfileType } from "@/interfaces"
import { geolocationService } from "@/services/geolocation.service"
import { hospitalService } from "@/services/hospital.service"
import { userService } from "@/services/user.service"

export async function saveProfile(state: any, formData: FormData) {
    const id = formData.get("id")?.toString()!
    const name = formData.get("name")?.toString()!
    const profileType = formData.get("profile-type")?.toString()! as ProfileType
    const healthInsurance = formData.getAll("health-insurance") as string[]

    // COORDS
    const latitude = Number(formData.get("latitude"))
    const longitude = Number(formData.get("longitude"))

    const coords: ICoords = { latitude, longitude }

    const { data: address } = await geolocationService.getLocation(id, coords)

    let dataToSave: any = {
        name,
        profileType,
        healthInsurance,
        address
    }

    console.log(profileType, id)

    if (profileType == 'patient') {
        const birthdate = formData.get("birthdate")?.toString()!

        dataToSave = {
            ...dataToSave,
            birthdate: new Date(birthdate),
        }

        return await userService.saveProfile(id, dataToSave)
    } else if (profileType == 'healthcare_professional') {
        const specialties = formData.getAll("specialty") as string[]

        dataToSave = {
            ...dataToSave,
            specialties
        }

        return await userService.saveProfile(id, dataToSave)
    } else {
        const cep = formData.get('cep')?.toString()!
        const city = formData.get('city')?.toString()!
        const state = formData.get('state')?.toString()!
        const street = formData.get('street')?.toString()!
        const professionals = formData.getAll('professional') as string[]

        dataToSave = {
            ...dataToSave,
            address: {
                cep,
                city,
                state,
                street,
            },
            professionals
        }

        const hospital = await hospitalService.listById(id)

        hospital
            ? await hospitalService.update(id, dataToSave)
            : await hospitalService.create(id, dataToSave)

        delete dataToSave.professionals
        return await userService.saveProfile(id, dataToSave)
    }
}