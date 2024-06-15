'use client'
import Link from "next/link";
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-beige p-4 flex justify-between items-center relative">
            <div className="cursor-pointer z-20" onClick={toggleMenu}>
                {isOpen ? <FiX className="text-blue-700 w-6 h-6" /> : <FiMenu className="text-blue-700 w-6 h-6" />}
            </div>

            <nav className={`fixed top-0 left-0 w-full h-full bg-beige flex flex-col px-4 justify-center gap-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link onClick={toggleMenu} href="/paciente/gestao-filas" className="text-blue-700 text-4xl font-bold border-b-2 pb-4 border-blue-700">Gestão de Filas</Link>
                <Link onClick={toggleMenu} href="/paciente/agendamentos" className="text-blue-700 text-4xl font-bold border-b-2 pb-4 border-blue-700">Agendamentos</Link>
                <Link onClick={toggleMenu} href="/perfil" className="text-blue-700 text-4xl font-bold border-b-2 pb-4 border-blue-700">Perfil</Link>
                <Link onClick={toggleMenu} href="/logout" className="text-blue-700 text-4xl font-bold border-b-2 pb-4 border-blue-700">Sair</Link>
            </nav>
        </header>
    );
};

export default Header;
