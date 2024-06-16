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

        console.log(id, 'line 19')

        await set(ref(database, `queues/${id}`), newQueue);
        return { data: { ...newQueue, id }, error: null };
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

    async getAverageQueueTime(hospitalId: string, currentUrgency: string) {
        const snapshot = await get(this.queuesRef);

        const queueFiltered = Object.values(snapshot.val()).filter((el: any) => el.hospitalId == hospitalId).reverse()

        const listByUrgency = queueFiltered
            .map((hospital: any) => Number(hospital.screeningData.urgency))
            .concat([Number(currentUrgency)])
            .sort((a, b) => a - b)

        const urgencyTimes = listByUrgency.reduce((acc: any, curr: any) => {
            if (curr == 1) acc.urgency1 += 1
            if (curr == 2) acc.urgency2 += 1
            if (curr == 3) acc.urgency3 += 1
            if (curr == 4) acc.urgency4 += 1
            if (curr == 5) acc.urgency5 += 1

            return acc
        },
            {
                urgency1: 0,
                urgency2: 0,
                urgency3: 0,
                urgency4: 0,
                urgency5: 0,
            }
        )

        const averageTime =
            urgencyTimes.urgency1 * 0 + urgencyTimes.urgency2 * 10 +
            urgencyTimes.urgency3 * 60 + urgencyTimes.urgency4 * 120 +
            urgencyTimes.urgency5 * 240

        if (snapshot.exists()) return { data: averageTime, error: null }
        else return { data: 0, error: null }
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
        return { data: updatedData, error: null };
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
