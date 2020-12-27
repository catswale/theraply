import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {API, graphqlOperation} from 'aws-amplify'
import {mutations, Client, queries, Therapist} from '@theraply/lib';
import { setClient } from './client.slice'
import {useAuth} from '../auth/auth.hooks'

export const useClient = () => {
  const {client} = useSelector(state => state.client)
  const dispatch = useDispatch()
  const {fetchCurrentAuthUser, user} = useAuth()
  const {username, attributes} = user;

  useEffect(() => {
    if (!username) {
      fetchCurrentAuthUser()
    }
    fetchClient()
  }, [user])

  async function fetchClient() {
    if (!username) return
    const data = await API.graphql(graphqlOperation(queries.getClient, {id: username})) as Data
    type Data = {data: {getClient: any}}
    const client = data.data.getClient
    if (!client) {
      console.log('client doesnt exist in db, creating')
      // todo see if you can set client based on the return value below
      await API.graphql(graphqlOperation(mutations.createClient, {input: {
        id: username,
        firstName: attributes.given_name,
        email: attributes.email,
        therapistIDs: [],
      }}))
      fetchClient()
    } else {
      client.therapists = client?.therapists?.items && client.therapists.items.map(connection => ({
        ...connection.therapist,
        channelID: connection.id,
      }))
      dispatch(setClient(client))
    }
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
    setClient: (newClient: Client) => dispatch(setClient(newClient))
  }
}

