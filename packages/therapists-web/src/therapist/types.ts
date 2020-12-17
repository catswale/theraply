

export interface Therapist {
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    clients: {
        channelID: string,
        firstName: string,
        lastName: string,
    }[]
  }