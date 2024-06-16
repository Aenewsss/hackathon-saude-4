import { IHospital, IProfessional } from "@/interfaces";
import { hospitalService } from "@/services/hospital.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function HospitalInputs({ id }: any) {

    const [Hospital, setHospital] = useState<IHospital>();
    const [Professionals, setProfessionals] = useState<IProfessional[]>([]);

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const { data: hospital } = await hospitalService.listById(id)
        setHospital(hospital)

        const { data: professionals } = await userService.getUsersByProfileType("healthcare_professional")
        setProfessionals(professionals)
    }

    return (
        <>
            <label className="block text-blue-700 text-xl font-semibold mb-4">Endereço</label>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">CEP</label>
                <input
                    // defaultValue={}
                    type="text"
                    id="cep"
                    name="cep"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Cidade</label>
                <input
                    // defaultValue={}
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Estado</label>
                <input
                    // defaultValue={}
                    type="text"
                    id="state"
                    name="state"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Profissionais</label>
                <div className="flex flex-wrap gap-y-4 mt-4">
                    {
                        Professionals?.map((el, index) => (
                            <div key={index} className="flex flex-1 gap-2 min-w-[160px] items-center">
                                <input defaultChecked={Hospital?.professionals?.find(professional => professional == el.id) ? true : false} id={el.id} name='health-insurance' value={el.id} type="checkbox" />
                                <label htmlFor={el.id}>{el.name}</label>
                            </div>
                        ))
                    }
                    {Professionals?.length == 0 && <p className="text-red-600">Nenhum profissional cadastrado</p>}
                </div>
            </div>
        </>
    )
}