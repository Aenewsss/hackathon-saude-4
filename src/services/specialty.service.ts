import { database } from "@/app/lib/firebase";
import { get, ref } from "firebase/database";

class SpecialtyService {
    private specialtiesRef = ref(database, 'specialties');

    async list() {
        const snapshot = await get(this.specialtiesRef);
        if (snapshot.exists()) return { data: Object.values(snapshot.val()), error: null }
        else return { data: [], error: null };
    }
}

export const specialtyService = new SpecialtyService()