// src/services/hospital.service.ts
import { database } from "@/app/lib/firebase";
import { ErrorEnum } from "@/enums";
import { IHospital } from "@/interfaces";
import { ref, set, get, update, remove, child } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

class HospitalService {
    private hospitalsRef = ref(database, 'hospitals');

    async create(data: IHospital) {
        const id = uuidv4();
        const newHospital: IHospital = {
            id,
            ...data,
        };
        await set(ref(database, `hospitals/${id}`), newHospital);
        return newHospital;
    }

    async list() {
        const snapshot = await get(this.hospitalsRef);
        if (snapshot.exists()) {
            return Object.values(snapshot.val()) as IHospital[];
        } else {
            return [];
        }
    }

    async listById(id: string) {
        const snapshot = await get(child(this.hospitalsRef, id));
        if (snapshot.exists()) {
            return snapshot.val() as IHospital;
        } else {
            return null;
        }
    }

    async update(id: string, data: Partial<IHospital>) {
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
