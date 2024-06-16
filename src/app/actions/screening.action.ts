import { queueService } from "@/services/queue.service"

export async function screening(state: any, formData: FormData) {
    const symptoms = formData.get('symptoms')?.toString()!
    const temperature = formData.get('temperature')?.toString()!
    const heartHate = formData.get('heart-hate')?.toString()!
    const bloodPressure = formData.get('blood-pressure')?.toString()!
    const illness = formData.get('illness')?.toString()!
    const urgency = formData.get('urgency')?.toString()!

    const id = formData.get('id')?.toString()!

    const data = {
        symptoms,
        temperature,
        heartHate,
        bloodPressure,
        illness,
        urgency
    }
    return await queueService.update(id, data)
}