import React, { useEffect, useState } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import {queries, mutations} from '@theraply/lib';

interface Therapist {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
}

export const Dashboard = () => {
  const [user, setUser] = useState({} as Therapist);
  
  useEffect(() => {
    fetchUserInfo()
  }, []);

  const fetchUserInfo = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    fetchUser(authUser)
  }
  async function fetchUser({username, attributes}: any) {
    try {
      const data = await API.graphql(graphqlOperation(queries.getTherapist, {id: username})) as TherapistData
      type TherapistData = {data: {getTherapist: Therapist}}
      const therapist = data.data.getTherapist;
      if (!therapist) {
        console.log('therapist doesnt exist in db, creating')
        await createTherapist(
          username,
          attributes.given_name,
          attributes.family_name,
          attributes.email,
          attributes.phone_number
        )
        fetchUser({username, attributes})
      } else {
        setUser(therapist)
      }
    } catch (err) {
      console.log(err)
    }

    
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Hello {user.firstName}</h2>
    </div>
  )
}

async function createTherapist(id: string, firstName: string, lastName: string, email: string, phoneNumber: string) {
  await API.graphql(graphqlOperation(mutations.createTherapist, {input: {id, firstName, lastName}}))
}