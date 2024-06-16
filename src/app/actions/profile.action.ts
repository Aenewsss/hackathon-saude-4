'use server'

import { ICoords, ProfileType } from "@/interfaces"
import { geolocationService } from "@/services/geolocation.service"
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
    }
}