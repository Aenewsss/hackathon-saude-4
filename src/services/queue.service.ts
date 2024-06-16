// src/services/queue.service.ts
import { database } from "@/app/lib/firebase";
import { ErrorEnum } from "@/enums";
import { IQueue } from "@/interfaces";
import { ref, set, get, update, remove, child } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

class QueueService {
    private queuesRef = ref(database, 'queues');

    async create(userId: string, hospitalId: string) {
        const id = uuidv4();

        const newQueue: IQueue = {
            userId,
            hospitalId,
        };

        await set(ref(database, `queues/${id}`), newQueue);
        return { data: newQueue, error: null };
    }

    async list() {
        const snapshot = await get(this.queuesRef);
        if (snapshot.exists()) return { data: Object.values(snapshot.val()), error: null }
        else return { data: [], error: null }
    }

    async listByUserId(id: string) {
        const snapshot = await get(this.queuesRef);
        if (snapshot.exists()) return { data: Object.values(snapshot.val()).filter((el: any) => el.userId == id).reverse()[0], error: null }
        else return { data: [], error: null }
    }

    async listById(id: string) {
        const snapshot = await get(child(this.queuesRef, id));
        if (snapshot.exists()) return { data: snapshot.val(), error: null }
        else return { data: [], error: null }
    }

    async update(id: string, data: any) {
        const dbRef = ref(database, `queues/${id}`);
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) return { data: null, error: ErrorEnum.NOT_FOUND };

        const updatedData = {
            screeningData: data
        };

        await update(dbRef, updatedData);

        const updatedSnapshot = await get(dbRef);
        return { data: updatedSnapshot.val(), error: null };
    }

    async delete(id: string) {
        const dbRef = ref(database, `queues/${id}`);
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) return { data: null, error: ErrorEnum.NOT_FOUND };

        await remove(dbRef);
        return { data: { id }, error: null };
    }
}

export const queueService = new QueueService();
