import { ProfileType } from "@/interfaces";

export function GetProfileName(profileType: ProfileType) {
    switch(profileType) {
        case "patient": return "paciente"
        case "hospital_unit": return "hospital"
        case "healthcare_professional": return "profissional"
    }
}