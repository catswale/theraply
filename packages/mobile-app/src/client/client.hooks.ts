import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Auth, API, graphqlOperation} from 'aws-amplify'
import {mutations, Client, queries} from '@theraply/lib';
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
    console.log(username)
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
    
  return {
    fetchClient,
    client,
  }
}

