import { database } from "@/app/lib/firebase"
import { ErrorEnum } from "@/enums"
import { ICoords } from "@/interfaces"
import { get, ref, set, update } from "firebase/database"

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

    async getUser(id: string) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        return { error: null, data: data.val() }
    }

    async saveProfile(id: string, name: string, birthdate: Date, profileType: string, healthInsurance: string[], address:any) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        const updatedRef = update(dbRef, {
            name,
            birthdate,
            profileType,
            healthInsurance,
            address
        })

        return { error: null, data: data.val() }

    }
}

export const userService = new UserService()