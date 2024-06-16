import { database } from "@/app/lib/firebase"
import { ErrorEnum } from "@/enums"
import { ICoords, ProfileType } from "@/interfaces"
import { get, ref, set, update } from "firebase/database"
import { hospitalService } from "./hospital.service"

class UserService {
    async createUser(id: string, email: string, name: string) {
        const dbRef = ref(database, `users/${id}`)

        return await set(dbRef,
            {
                email,
                name
            }
        )
    }

    async getById(id: string) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        return { error: null, data: data.val() }
    }

    async saveProfile(id: string, dataToSave:any) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        const updatedRef = update(dbRef, {
            ...dataToSave
        })

        return { error: null, data: data.val() }
    }

    async updateProfileType(id: string, profileType: ProfileType) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)
        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        await update(dbRef, {
            profileType
        })

        return { error: null, data: profileType }
    }

    async getUsersByProfileType(profileType: ProfileType) {
        const dbRef = ref(database, `users/`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        const users = data.val()
        const filteredUsers = Object.keys(users)
            .filter(el => users[el].profileType == profileType)
            .map(el => ({ id: el, ...users[el] })) as any

        return { error: null, data: filteredUsers }
    }
}

export const userService = new UserService()