import { useEffect, useState } from "react";

export default function PatientInputs({ user }: any) {

    const [BirthdateFormatted, setBirthdateFormatted] = useState('0000-00-00');

    useEffect(() => {
        const date = new Date(user.birthdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        setBirthdateFormatted(`${year}-${month}-${day}`)
    }, []);

    return (
        <>
            <div className="mb-4">
                <label htmlFor="birthdate" className="block text-blue-700 text-lg font-semibold">Data de nascimento</label>
                <input
                    defaultValue={BirthdateFormatted}
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cpf" className="block text-blue-700 text-lg font-semibold">CPF</label>
                <input
                    defaultValue={user.cpf}
                    type="number"
                    id="cpf"
                    name="cpf"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-blue-700 text-lg font-semibold">Número de Telefone</label>
                <input
                    defaultValue={user.phone}
                    type="number"
                    id="phone"
                    name="phone"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="emergency-phone" className="block text-blue-700 text-lg font-semibold">Contato de emergência</label>
                <input
                    defaultValue={user.emergencyPhone}
                    type="number"
                    id="emergency-phone"
                    name="emergency-phone"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Sexo</label>
                <div className="flex gap-2">
                    <input
                        defaultChecked={user.sex == 'Masculino' ?true: false}
                        value={'Masculino'}
                        type="radio"
                        id="masc"
                        name="sex"
                        className="mt-1 p-2 border rounded-md bg-stone-300"
                        required
                    />
                    <label htmlFor="masc">Masculino</label>
                </div>
                <div className="flex gap-2">
                    <input
                        defaultChecked={user.sex == 'Feminino' ?true: false}
                        value={'Feminino'}
                        type="radio"
                        id="fem"
                        name="sex"
                        className="mt-1 p-2 border rounded-md bg-stone-300"
                        required
                    />
                    <label htmlFor="fem">Feminino</label>
                </div>
            </div>
        </>

    )
}