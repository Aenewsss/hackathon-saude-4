import { database } from "@/app/lib/firebase"
import { ErrorEnum } from "@/enums"
import { get, ref } from "firebase/database"

class HealthInsuranceService {
    async listAll(){
        const dbRef = ref(database, `health_insurance`)

        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        return { error: null, data: data.val() }
    }
}

export const healthInsuranceService = new HealthInsuranceService()