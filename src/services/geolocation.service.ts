import { database } from "@/app/lib/firebase"
import { ErrorEnum } from "@/enums"
import { ICoords } from "@/interfaces"
import { get, ref } from "firebase/database"

class GeolocationService {
    async getLocation(id: string, coords: ICoords) {
        const dbRef = ref(database, `users/${id}`)

        const userData = await get(dbRef)

        if (!userData.exists()) return { data: null, error: ErrorEnum.NOT_FOUND }

        if (userData.val()?.address && userData.val().address.lat == coords.latitude && userData.val().address.lon == coords.longitude) return { data: userData.val().address, error: null }

        const result = await (await fetch(`https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}&api_key=${process.env.NEXT_PUBLIC_GEOLOCATION_API}`)).json()

        return {
            error: null,
            data: {
                address: result.address,
                lat: result.lat, lon: result.lon
            }
        }
    }
}

export const geolocationService = new GeolocationService()