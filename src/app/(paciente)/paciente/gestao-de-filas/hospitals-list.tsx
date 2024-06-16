'use client'
import { UserEnum } from "@/enums";
import { IHospital } from "@/interfaces";
import { hospitalService } from "@/services/hospital.service";
import { queueService } from "@/services/queue.service";
import { storageService } from "@/services/storage.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function HospitalsList() {

    const router = useRouter();

    const [hospitals, setHospitals] = useState<IHospital[]>([]);

    useEffect(() => {
        getHospitals();
    }, []);

    async function getHospitals() {
        const { data } = await hospitalService.list();
        setHospitals(data as any);
    };

    async function chooseHospital(id: string) {
        const userId = storageService.getItem(UserEnum.USER_ID)
        const { data } = await queueService.create(userId, id);
        console.log('data line 28', data)
        router.push(`/paciente/triagem/${data.id}`);
    }

    if (!hospitals) return <p>Carregando...</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital) => (
                <button onClick={_ => chooseHospital(hospital.id!)} key={hospital.id}>
                    <a className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-blue-700 mb-2">{hospital.name}</h2>
                        <p className="text-gray-700 mb-1">{hospital.address.city}, {hospital.address.state}</p>
                        <p className="text-gray-700 mb-1">{hospital.address.street}</p>
                        <p className="text-gray-700">{hospital.phone}</p>
                    </a>
                </button>
            ))}
        </div>
    );
};