import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="bg-beige p-4">
            <h1 className="text-blue-700 text-3xl font-bold mb-4">Organize sua saúde com praticidade</h1>
            <p className="text-blue-700 mb-6">Health Queue é uma plataforma de gestão de filas e agendamentos com foco no paciente</p>
            <p className="text-blue-700 mb-6">Descubra a plataforma que otimiza filas e agendamentos</p>
            <Link href="/login" className="bg-blue-500 text-white px-6 py-2 rounded-full">FAÇA SEU LOGIN</Link>
        </section>
    );
};

export default HeroSection;
