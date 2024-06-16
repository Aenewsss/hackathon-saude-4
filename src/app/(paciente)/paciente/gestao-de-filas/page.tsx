import HospitalsList from "./hospitals-list";

export default function QueueManagementPage() {

    return (
        <div className="bg-beige min-h-screen p-4">
            <h1 className="text-blue-700 text-3xl font-bold mb-6">Gestão de Filas</h1>
            <HospitalsList />
        </div>
    );
}
