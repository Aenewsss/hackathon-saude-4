'use client'

import { UserEnum } from "@/enums";
import { IHospital, IQueue, IUser } from "@/interfaces";
import { hospitalService } from "@/services/hospital.service";
import { queueService } from "@/services/queue.service";
import { storageService } from "@/services/storage.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function CurrentQueue() {

    const [Queue, setQueue] = useState<IQueue>();
    const [User, setUser] = useState<IUser>();
    const [Hospital, setHospital] = useState<IHospital>();
    const [AverageQueueTime, setAverageQueueTime] = useState<number>();

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const userId = storageService.getItem(UserEnum.USER_ID)

        const { data: queue } = await queueService.listByUserId(userId) as any
        setQueue(queue as any)

        if (queue) {
            const { data: user } = await userService.getById(queue.userId)
            setUser(user)

            const { data: hospital } = await hospitalService.listById(queue.hospitalId)
            setHospital(hospital)

            const { data } = await queueService.getAverageQueueTime(queue.hospitalId, queue.screeningData.urgency)
            setAverageQueueTime(data as number)
        }
    }

    if (!Queue || !Hospital || !User) {
        return null;
    }

    function formatAge(birthdate: string) {
        const today = new Date();
        const birth = new Date(birthdate);

        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        // Adjust age if the birthdate hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    return (
        <div className="p-6 rounded-lg shadow-md w-full max-w-md border border-stone-300 my-6">
            <h2 className="text-blue-700 text-3xl font-bold">Fila Atual</h2>
            <span className="text-blue-700 font-bold text-xl">Tempo estimado {AverageQueueTime}</span>
            <h3 className="text-blue-700 text-xl font-semibold mt-6">{Hospital.name}</h3>
            <p className="text-gray-700 mb-2">{Hospital.address.street}</p>
            <p className="text-gray-700 mb-2">{Hospital.address.city}, {Hospital.address.state}</p>
            <h4 className="text-blue-700 text-xl font-semibold mt-4">Dados da Triagem:</h4>
            <ul className="list-disc pl-5">
                <li className="text-gray-700 mb-2">Sintomas: {Queue.screeningData.symptoms}</li>
                <li className="text-gray-700 mb-2">Temperatura: {Queue.screeningData.temperature}°C</li>
                <li className="text-gray-700 mb-2">Frequência Cardíaca: {Queue.screeningData.heartRate} bpm</li>
                <li className="text-gray-700 mb-2">Pressão Arterial: {Queue.screeningData.bloodPressure}</li>
            </ul>
            <h5 className="text-blue-700 text-xl font-semibold mt-4">Dados do Paciente:</h5>
            <ul className="list-disc pl-5">
                <li className="text-gray-700 mb-2">Nome: {User.name}</li>
                <li className="text-gray-700 mb-2">Sexo: {User.sex}</li>
                <li className="text-gray-700 mb-2">Idade:{formatAge(User.birthdate)} </li>
                <li className="text-gray-700 mb-2">Contato de emergência: {User.emergencyPhone}</li>
            </ul>
        </div>
    );
}