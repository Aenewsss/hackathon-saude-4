'use client'
import { UserEnum } from "@/enums";
import { IHospital, IQueue } from "@/interfaces";
import { hospitalService } from "@/services/hospital.service";
import { queueService } from "@/services/queue.service";
import { storageService } from "@/services/storage.service";
import { userService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface QueueWithDetails extends IQueue {
    user?: { name: string; sex: string; phone: string };
    hospital?: IHospital;
}

export default function QueueList() {
    const router = useRouter();
    const [queues, setQueues] = useState<QueueWithDetails[]>([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const userId = storageService.getItem(UserEnum.USER_ID);
        const { data: queueData } = await queueService.listByHospitalId(userId) as any;

        const detailedQueues = await Promise.all(queueData.map(async (queue: IQueue) => {
            const { data: user } = await userService.getById(queue.userId);
            const { data: hospital } = await hospitalService.listById(queue.hospitalId);

            return {
                ...queue,
                user,
                hospital,
            };
        }));

        setQueues(detailedQueues);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {queues.map((queue) => (
                <div key={queue.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">{queue.hospital?.name}</h2>
                    <p className="text-gray-700 mb-1">{queue.hospital?.address.city}, {queue.hospital?.address.state}</p>
                    <p className="text-gray-700 mb-1">{queue.hospital?.address.street}</p>
                    <p className="text-gray-700 mb-1">{queue.hospital?.phone}</p>
                    <hr className="my-4" />
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">User Details</h3>
                    <p className="text-gray-700 mb-1">Name: {queue.user?.name}</p>
                    <p className="text-gray-700 mb-1">Sex: {queue.user?.sex}</p>
                    <p className="text-gray-700 mb-1">Phone: {queue.user?.phone}</p>
                    <hr className="my-4" />
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Screening Data</h3>
                    <p className="text-gray-700 mb-1">Symptoms: {queue.screeningData?.symptoms}</p>
                    <p className="text-gray-700 mb-1">Blood Pressure: {queue.screeningData?.bloodPressure}</p>
                    <p className="text-gray-700 mb-1">Heart Rate: {queue.screeningData?.heartRate}</p>
                    <p className="text-gray-700 mb-1">Temperature: {queue.screeningData?.temperature}</p>
                    <p className="text-gray-700 mb-1">Urgency: {queue.screeningData?.urgency}</p>
                </div>
            ))}
        </div>
    );
}
