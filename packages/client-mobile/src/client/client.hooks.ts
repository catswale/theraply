import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import {
  mutations, Client, queries, Therapist, ClientTherapistRelationship,
} from '@theraply/lib';
import { setClient, setRelationships, ClientState } from './client.slice';
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
          therapistIDs: [],
        },
      }));
    }
    console.log(newClient);
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

  async function createTherapistClientConnection(therapist: Therapist, client: Client) {
    if (client.therapistIDs.find((id) => id === therapist.id)) return;
    console.log('adding client therapist connection.');

    const res = await API.graphql(graphqlOperation(mutations.createTherapistClientRelationship, {
      input: {
        therapistID: therapist.id,
        clientID: client.id,
      },
    }));
    const newClient: any = {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      therapistIDs: [...client.therapistIDs, therapist.id],
    };

    const update = await API.graphql({ query: mutations.updateClient, variables: { input: newClient } });
    await initClient();
  }

  return {
    createTherapistClientConnection,
    client,
    setClient: (data: any) => dispatch(setClient(data)),
    updateClient: (data: any) => dispatch(setClient({ ...client, ...data })),
  };
};
