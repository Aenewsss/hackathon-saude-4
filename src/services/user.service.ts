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

    async saveProfile(id: string, name:string ,birthdate: Date,profileType: string, coords?:ICoords) {
        const dbRef = ref(database, `users/${id}`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        console.log(coords)

        const updatedRef = update(dbRef, {
            name,
            birthdate,
            profileType,
            coords
        })
        
        return { error: null, data: data.val() }

    }
}

export const userService = new UserService()