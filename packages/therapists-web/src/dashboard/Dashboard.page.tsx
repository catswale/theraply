import React, { useEffect, useState } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import {queries, mutations} from '@theraply/lib';
import { useHistory } from "react-router-dom";
import { ClientCard } from './Client.card';
import {Client} from '../client/types'
import {Therapist} from '../therapist/types'

export const Dashboard = () => {
  const [therapist, setTherapist] = useState({} as Therapist);
  const history = useHistory()
  useEffect(() => {
    fetchUserInfo()
  }, []);

  const signOut = async () => {
    try {
      console.log('signing out')
        await Auth.signOut();
        history.push('login')
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  const fetchUserInfo = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    fetchUser(authUser)
  }
  async function fetchUser({username, attributes}: any) {
    try {
      const data = await API.graphql(graphqlOperation(queries.getTherapistAndClients, {id: username})) as TherapistData
      type TherapistData = {data: {getTherapist: any}}
      const therapist = data.data.getTherapist;

      if (!therapist) {
        console.log('therapist doesnt exist in db, creating')
        await API.graphql(graphqlOperation(mutations.createTherapist, {input: {
          id: username, firstName: attributes.given_name, lastName: attributes.family_name, email: attributes.email
        }}))

        fetchUser({username, attributes})
      } else {
        therapist.clients = therapist.clients.items.map((connection: any) => ({
          ...connection.client,
          channelID: connection.id,
        }))
        setTherapist(therapist)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Dashboard</h1>
      <h2>Hello {therapist.firstName}</h2>
      <h3>Your Clients</h3>
      {
        therapist?.clients?.map(client => (
          <ClientCard key={client.channelID} client={client} therapist={therapist}/>
        ))
      }
      <button onClick={signOut}>SIGN OUT</button>
    </div>
  )
}


