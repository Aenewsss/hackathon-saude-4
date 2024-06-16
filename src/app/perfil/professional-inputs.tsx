import { IProfessional } from "@/interfaces";
import { specialtyService } from "@/services/specialty.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function ProfessionalInputs({ id }: any) {

    const [Specialties, setSpecialties] = useState<string[]>();
    const [Professional, setProfessional] = useState<IProfessional>();

    useEffect(() => {
        getProfessional()
    }, []);

    useEffect(() => {
        getSpecialties()
    }, [Professional]);

    async function getProfessional() {
        const { data: professional } = await userService.getById(id)
        setProfessional(professional)
    }

    async function getSpecialties() {
        const { data } = await specialtyService.list()
        setSpecialties(data as any)

    }

    return (
        <>
            <div className="mb-4">
                <label htmlFor="birthdate" className="block text-blue-700 text-lg font-semibold">Minhas Especialidades</label>
                <div className="flex flex-wrap gap-y-4 mt-4">
                    {
                        Specialties?.map((el, index) => (
                            <div key={index} className="flex flex-1 gap-2 min-w-[160px] items-center">
                                <input defaultChecked={Professional?.specialties?.find(specialty => specialty == el) ? true : false} id={el} name='specialty' value={el} type="checkbox" />
                                <label htmlFor={el}>{el}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}