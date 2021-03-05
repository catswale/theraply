import * as customQueries from './graphql/customQueries';
import * as customMutations from './graphql/customMutations';
import * as defaultQueries from './graphql/queries';
import * as defaultMutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

const queries = { ...defaultQueries, ...customQueries };
const mutations = { ...defaultMutations, ...customMutations };
export { default as awsExports } from './aws-exports';

export * from './types';
export * from './constants';
export * from './payment';
export * from './palette';
export {
  queries,
  subscriptions,
  mutations,
};
