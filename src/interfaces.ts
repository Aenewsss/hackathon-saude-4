export interface IUser {
    name: string
    email: string
    profileType: ProfileType
    birthdate: string
    uid?: string
    healthInsurance: string[]
}

type ProfileType = 'patient' | 'hospital_unit' | 'healthcare_professional';

export interface ICoords {
    latitude: number
    longitude: number
}

export interface IHealthInsurance {
    name:string
}