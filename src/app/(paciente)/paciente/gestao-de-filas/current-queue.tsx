export default function CurrentQueue() {


    
    
    if (!user.queue) {
        return null;
    }

    return (
        <div className="bg-beige min-h-screen p-4 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-blue-700 text-2xl font-bold mb-4">{hospital.name}</h2>
                <p className="text-gray-700 mb-2">{hospital.address.street}</p>
                <p className="text-gray-700 mb-2">{hospital.address.city}, {hospital.address.state}</p>
                <h3 className="text-blue-700 text-xl font-semibold mt-4">Dados da Triagem:</h3>
                <ul className="list-disc pl-5">
                    <li className="text-gray-700 mb-2">Sintomas: {screeningData.symptoms}</li>
                    <li className="text-gray-700 mb-2">Temperatura: {screeningData.temperature}°C</li>
                    <li className="text-gray-700 mb-2">Frequência Cardíaca: {screeningData.heartRate} bpm</li>
                    <li className="text-gray-700 mb-2">Pressão Arterial: {screeningData.bloodPressure}</li>
                </ul>
            </div>
        </div>
    );
}