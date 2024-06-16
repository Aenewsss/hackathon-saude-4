export interface IUser extends IAccess {
    profileType: ProfileType
    birthdate: string
}

export type ProfileType = 'patient' | 'hospital_unit' | 'healthcare_professional';

export interface ICoords {
    latitude: number
    longitude: number
}

export interface IProfessional extends IAccess {
    specialties: string[]
    profileType: ProfileType
}

export interface IHospital extends IAccess {
    professionals: string[] //array com os IDs dos profissionais
    specialties: string[] // array com as especialidades que o hospital atende
}

interface IAccess {
    id?: string;
    name: string;
    address: any;
    phone: string;
    healthInsurance: string[]
    email: string
}