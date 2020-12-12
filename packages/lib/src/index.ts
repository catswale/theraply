export interface Message {
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export const test = 50