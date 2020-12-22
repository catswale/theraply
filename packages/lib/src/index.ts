import * as defaultQueries from '../graphql/queries'
import * as customQueries from '../graphql/customQueries'
import * as subscriptions from '../graphql/subscriptions'
import * as mutations from '../graphql/mutations'
const queries = {...defaultQueries, ...customQueries}

export * from './types'
export {
  queries,
  subscriptions,
  mutations,
}
