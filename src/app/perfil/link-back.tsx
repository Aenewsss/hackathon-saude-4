'use client'
import { UserEnum } from "@/enums";
import { storageService } from "@/services/storage.service";
import { userService } from "@/services/user.service";
import { GetProfileName } from "@/utils/get-profile-name.util";
import { useRouter } from "next/navigation";

export default function LinkBack() {

    const router = useRouter()

    async function goBack() {
        const userId = storageService.getItem(UserEnum.USER_ID)
        const { data } = await userService.getById(userId)

        const profileName = GetProfileName(data.profileType)

        router.push(`/${profileName}`)
    }

    return (
        <span onClick={goBack} className="cursor-pointer text-blue-400">← Voltar</span>
    )
}