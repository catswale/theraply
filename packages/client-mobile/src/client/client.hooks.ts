import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import {
  mutations, Client, queries, Therapist, ClientTherapistRelationship,
} from '@theraply/lib';
import { setClient, ClientState } from './client.slice';
import { useAuth } from '../auth/auth.hooks';

export const useClient = () => {
  const { client }: ClientState = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const { user, fetchCurrentAuthUser } = useAuth();
  const { id, attributes } = user;

  useEffect(() => {
    if (!id) { // get auth details after user has already logged in
      fetchCurrentAuthUser();
    }
  }, []);

  useEffect(() => {
    if (id && !client?.id) {
      initClient();
    }
  }, [user]);

  async function initClient() {
    if (!id) return;
    console.log('fetching client');
    const data = await API.graphql(graphqlOperation(queries.getClient, { id })) as Data;
    type Data = {data: {getClient: any}}
    console.log(`fetched client ${data}`);
    let newClient = data.data.getClient;
    if (!newClient) {
      console.log('client doesnt exist in db, creating');
      newClient = await API.graphql(graphqlOperation(mutations.createClient, {
        input: {
          id,
          firstName: attributes.given_name,
          email: attributes.email,
        },
      }));
    }
    dispatch(setClient(newClient));
  }

  return {
    client,
    setClient: (data: any) => dispatch(setClient(data)),
    updateClient: (data: any) => dispatch(setClient({ ...client, ...data })),
  };
};
