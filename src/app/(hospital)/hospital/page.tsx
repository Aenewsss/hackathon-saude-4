// src/pages/PatientHomePage.jsx
import Image from "next/image";
import Link from "next/link";
import React from 'react';

export default function Page() {
    return (
        <main className="bg-beige flex flex-col items-center justify-center md:px-0 px-4">
            <Image className="mb-6" src="/logo.svg" alt="Logo" width={120} height={120} />
            <div className="flex flex-col md:flex-row gap-6">
                <Card
                    title="Gestão de filas"
                    description="Gerencie sua posição na fila em tempo real"
                    link="/hospital/gestao-de-filas"
                />
                <Card
                    title="Agendamentos"
                    description="Agende suas consultas de forma rápida e fácil"
                    link="/hospital/agendamentos"
                />
            </div>
        </main>
    );
};

const Card = ({ title, description, link }: any) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-blue-700 text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 text-center mb-6">{description}</p>
            {title == 'Agendamentos'
                ? <button disabled className="bg-gray-500 text-white py-2 px-4 rounded-md text-lg opacity-70">Em breve</button>
                : <Link href={link} className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg">Acessar</Link>
            }
        </div>
    );
};