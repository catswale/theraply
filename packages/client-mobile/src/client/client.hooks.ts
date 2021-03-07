import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import {
  mutations, Client, queries, Therapist, ClientTherapistRelationship,
} from '@theraply/lib';
import { setClient, ClientState, setRelationships } from './client.slice';
import { useAuth } from '../auth/auth.hooks';

export const useClient = () => {
  const { client, relationships }: ClientState = useSelector((state) => state.client);
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
      initRelationships();
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

  async function initRelationships() {
    const data = await API.graphql(graphqlOperation(queries.getClientRelationships, {
      clientID: id,
    })) as Data;
    type Data = {data: {getClientRelationships: {items: ClientTherapistRelationship[]}}}
    const result = data.data.getClientRelationships.items;
    dispatch(setRelationships(result));
  }

  function getRelationship(therapistID: string) {
    const result = relationships.find(r => r.therapistID === therapistID)
    if (!result) throw new Error('No relationship found.')
    return result;
  }

  return {
    client,
    getRelationship,
    setClient: (data: any) => dispatch(setClient(data)),
    updateClient: (data: any) => dispatch(setClient({ ...client, ...data })),
  };
};
