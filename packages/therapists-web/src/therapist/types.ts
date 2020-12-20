

export interface Therapist {
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    clients: TherapistClient[]
  }

export interface TherapistClient {
    id: string,
    channelID: string,
    firstName: string,
    lastName: string,
}