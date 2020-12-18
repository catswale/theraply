export interface Client {
    id: string,
    firstName: string,
    lastName?: string,
    email: string,
    phoneNumber?: string,
    therapists?: any[],
    therapistIDs: string[],
    channelID?: string,
  }