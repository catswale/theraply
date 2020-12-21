// export type Message = {
//   id: string;
//   channelID: string;
//   authorID: string;
//   body: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
import * as defaultQueries from '../graphql/queries'
import * as customQueries from '../graphql/customQueries'
import * as subscriptions from '../graphql/subscriptions'
import * as mutations from '../graphql/mutations'
const queries = {...defaultQueries, ...customQueries}
export {
  queries,
  subscriptions,
  mutations,
}
export const test = 50