import { IHospital, IProfessional } from "@/interfaces";
import { hospitalService } from "@/services/hospital.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function HospitalInputs({ id }: any) {

    const [Hospital, setHospital] = useState<IHospital>();
    const [Professionals, setProfessionals] = useState<IProfessional[]>([]);
    const [Address, setAddress] = useState<{city: string, state: string, street: string}>();

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const { data: hospital } = await hospitalService.listById(id)
        setHospital(hospital)

        getAddressByCep(hospital.address.cep)

        const { data: professionals } = await userService.getUsersByProfileType("healthcare_professional")
        setProfessionals(professionals)

    }

    async function getAddressByCep(cep:string){
        const data = await (await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)).json()
        if(data) setAddress({city: data.city, state: data.state, street: data.street})
    }

    return (
        <>
            <label className="block text-blue-700 text-xl font-semibold mb-4">Endereço</label>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">CEP</label>
                <input
                    onChange={e => e.target.value.length == 8 && getAddressByCep(e.target.value)}
                    type="text"
                    id="cep"
                    name="cep"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                    maxLength={8}
                    max={8}
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Cidade</label>
                <input
                    defaultValue={Address?.city}
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
                    defaultValue={Address?.state}
                    type="text"
                    id="state"
                    name="state"
                    className="mt-1 p-2 w-full border rounded-md bg-stone-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-lg font-semibold">Complemento</label>
                <input
                    defaultValue={Address?.street}
                    type="text"
                    id="street"
                    name="street"
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
                                <input defaultChecked={Hospital?.professionals?.find(professional => professional == el.id) ? true : false} id={el.id} name='professional' value={el.id} type="checkbox" />
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