'use server'

import { ICoords } from "@/interfaces"
import { userService } from "@/services/user.service"

export async function saveProfile(state: any, formData: FormData) {
    const id = formData.get("id")?.toString()!
    const name = formData.get("name")?.toString()!
    const birthdate = formData.get("birthdate")?.toString()!
    const profileType = formData.get("profile-type")?.toString()!
    const latitude = Number(formData.get("latitude"))
    const longitude = Number(formData.get("longitude"))

    const coords: ICoords = { latitude, longitude }

    return await userService.saveProfile(id, name, new Date(birthdate), profileType, coords)
}