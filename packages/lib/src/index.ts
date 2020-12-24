import * as customQueries from '../graphql/customQueries'
import * as customMutations from '../graphql/customMutations'
import * as defaultQueries from '../graphql/queries'
import * as defaultMutations from '../graphql/mutations'
import * as subscriptions from '../graphql/subscriptions'
const queries = {...defaultQueries, ...customQueries}
const mutations = {...defaultMutations, ...customMutations}

export * from './types'
export {
  queries,
  subscriptions,
  mutations,
}
