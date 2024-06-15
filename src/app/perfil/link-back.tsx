'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LinkBack() {

    const router = useRouter()

    function goBack() {
        router.back()
    }

    return (
        <span onClick={goBack} className="cursor-pointer text-blue-400">← Voltar</span>
    )
}