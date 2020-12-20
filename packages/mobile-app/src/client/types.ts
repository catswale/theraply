export interface Client {
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