export type Message = {
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Client = {
  id: string,
  owner: string,
  firstName: string,
  lastName?: string,
  email: string,
  phoneNumber?: string,
  therapists?: any[],
  therapistIDs: string[],
  channelID?: string,
  createdAt: Date,
  updatedAt: Date,
}

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