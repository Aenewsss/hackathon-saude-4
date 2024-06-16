import ScreeningForm from "./screening-form";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="bg-beige min-h-screen flex justify-center items-center p-4">
            <ScreeningForm id={params.id} />
        </div>
    );
};