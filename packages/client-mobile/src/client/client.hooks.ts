import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import {
  mutations, Client, queries, Therapist,
} from '@theraply/lib';
import { setClient } from './client.slice';
import { useAuth } from '../auth/auth.hooks';

export const useClient = () => {
  const { client }: {client: Client} = useSelector((state) => state.client);
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
      fetchClient();
    }
  }, [user]);

  // Fetch user data from the database
  async function fetchClient() {
    if (!id) return;
    const data = await API.graphql(graphqlOperation(queries.getClient, { id })) as Data;
    type Data = {data: {getClient: any}}

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
    newClient.therapists = newClient?.therapists?.items && newClient.therapists.items.map((connection) => ({
      ...connection.therapist,
      channelID: connection.id,
    }));
    console.log(newClient);
    dispatch(setClient(newClient));
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
    await fetchClient();
  }

  return {
    fetchClient,
    createTherapistClientConnection,
    client,
    setClient: (data: any) => dispatch(setClient({ ...client, ...data })),
  };
};
