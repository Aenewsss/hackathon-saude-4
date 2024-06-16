import { useEffect, useState } from "react";

export default function PatientInputs({user}: any) {

    const [BirthdateFormatted, setBirthdateFormatted] = useState('0000-00-00');

    useEffect(() => {
        const date = new Date(user.birthdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        setBirthdateFormatted(`${year}-${month}-${day}`)
    }, []);

    return (
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
    )
}