// src/services/ScreeningService.js
import { database } from "@/app/lib/firebase";
import { ref, set, get, update, remove, child } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

class ScreeningService {
    screeningsRef: any;

    constructor() {
        this.screeningsRef = ref(database, 'screenings');
    }

    async create(data: any) {
        const id = uuidv4();
        const newScreening = {
            id,
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        await set(ref(database, `screenings/${id}`), newScreening);
        return newScreening;
    }

    async list() {
        const snapshot = await get(this.screeningsRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return [];
        }
    }

    async listById(id: string) {
        const snapshot = await get(child(this.screeningsRef, id));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }

    async update(id: string, data: any) {
        const updatedData = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        await update(ref(database, `screenings/${id}`), updatedData);
        return { id, ...updatedData };
    }

    async delete(id: string) {
        await remove(ref(database, `screenings/${id}`));
        return { id };
    }
}

export const screeningService = new ScreeningService();