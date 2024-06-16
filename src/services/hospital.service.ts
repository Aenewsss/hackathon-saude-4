import { database } from "@/app/lib/firebase";
import { ErrorEnum } from "@/enums";
import { IHospital } from "@/interfaces";
import { ref, set, get, update, remove, child } from "firebase/database";

class HospitalService {
    private hospitalsRef = ref(database, 'hospitals');

    async create(id: string, data: IHospital) {
        const newHospital: IHospital = {
            id,
            ...data,
        };
        await set(ref(database, `hospitals/${id}`), newHospital);

        return { data: newHospital, error: null };
    }

    async list() {
        const snapshot = await get(this.hospitalsRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const hospitals = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            return { data: hospitals, error: null };
        } else return { data: [], error: null }
    }

    async listById(id: string) {
        const snapshot = await get(child(this.hospitalsRef, id));
        if (snapshot.exists()) return { data: snapshot.val(), error: null };
        return { data: null, error: ErrorEnum.NOT_FOUND }
    }

    async update(id: string, data: IHospital) {
        const dbRef = ref(database, `hospitals/${id}`);
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) return { data: null, error: ErrorEnum.NOT_FOUND };

        const updatedData = {
            ...data,
        };
        await update(dbRef, updatedData);

        const updatedSnapshot = await get(dbRef);
        return { data: updatedSnapshot.val(), error: null };
    }

    async delete(id: string) {
        const dbRef = ref(database, `hospitals/${id}`);
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) return { data: null, error: ErrorEnum.NOT_FOUND };

        await remove(dbRef);
        return { data: { id }, error: null };
    }
}

export const hospitalService = new HospitalService();
