import React, { useEffect, useState } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import {queries} from '@theraply/lib';

export const Dashboard = () => {
  // const [user, setUser] = useState({} as any);

  // useEffect(() => {
  //   // fetchUserInfo()
  // }, []);

  // const fetchUserInfo = async () => {
  //   const {username} = await Auth.currentAuthenticatedUser()
  //   fetchUser(username)
  // }
  // async function fetchUser(id: string) {
  //   try {
  //     const data = await API.graphql(graphqlOperation(queries.getTherapist, {id}))
  //     console.log(data)
  //     setUser(user)
  //     // type MessageData = {data: {getTherapist: {items: Message[]}}}
  //     // const messages = messageData.data.messagesByChannelID.items;
  //   } catch (err) {
  //     console.log(err)
  //   }

    
  // }
  return <h1>Dashboard</h1>
}