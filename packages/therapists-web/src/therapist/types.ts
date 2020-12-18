

export interface Therapist {
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    clients: TherapistClient[]
  }

export interface TherapistClient {
    channelID: string,
    firstName: string,
    lastName: string,
}