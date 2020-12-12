export interface Message {
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
import * as queries from '../graphql/queries'
import * as subscriptions from '../graphql/subscriptions'
import * as mutations from '../graphql/mutations'

export {
  queries,
  subscriptions,
  mutations,
}
export const test = 50