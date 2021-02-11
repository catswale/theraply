import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {API, graphqlOperation} from 'aws-amplify'
import {mutations, Client, queries, Therapist} from '@theraply/lib';
import { setClient, setID } from './client.slice'
import {useAuth} from '../auth/auth.hooks'


export const useClient = () => {
  const {client, id}: {client: Client, id: string} = useSelector(state => state.client)
  const dispatch = useDispatch()
  const {fetchCurrentAuthUser, user} = useAuth()
  const {attributes} = user;
  useEffect(() => {
    if (id && !client?.id) {
      fetchClient()
    }
  }, [id])

  async function fetchClient() {
    if (!id) return
    const data = await API.graphql(graphqlOperation(queries.getClient, {id})) as Data
    type Data = {data: {getClient: any}}

    let client = data.data.getClient
    if (!client) {
      console.log('client doesnt exist in db, creating')
      client = await API.graphql(graphqlOperation(mutations.createClient, {input: {
        id,
        firstName: attributes.given_name,
        email: attributes.email,
        therapistIDs: [],
      }}))
    }
    client.therapists = client?.therapists?.items && client.therapists.items.map(connection => ({
      ...connection.therapist,
      channelID: connection.id,
    }))
    dispatch(setClient(client))
  }

  async function createTherapistClientConnection(therapist: Therapist, client: Client) {
    if (client.therapistIDs.find(id => id === therapist.id)) return
    console.log('adding client therapist connection.')
  
    const res = await API.graphql(graphqlOperation(mutations.createTherapistClientRelationship, {input: {
      therapistID: therapist.id,
      clientID: client.id,
    }}))
    const newClient: any = {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      therapistIDs: [...client.therapistIDs, therapist.id],
    }
  
    const update = await API.graphql({ query: mutations.updateClient, variables: {input: newClient}});
    await fetchClient()
  }
    
  return {
    fetchClient,
    createTherapistClientConnection,
    client,
    setID: (id: string) => dispatch(setID(id)),
    setClient: (newClient: Client) => dispatch(setClient(newClient))
  }
}

