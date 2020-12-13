import React, { useEffect, useState } from 'react'
import {mutations, subscriptions, queries} from '@theraply/lib';
import { Auth, API, graphqlOperation} from 'aws-amplify'

export const Dashboard = () => {
  useEffect(() => {
    // fetchTherapists();
    fetchClient()
    // createClient()
  })
  async function fetchTherapists() {
    const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data
    type Data = {data: {listTherapists: {items: any[]}}}
    const messages = data.data.listTherapists.items;
    // console.log(messages)
  }
  async function fetchClient() {
    const {username} = await Auth.currentAuthenticatedUser();
    console.log('fetching client');
    const data = await API.graphql(graphqlOperation(queries.getClient, {id: username})) as Data
    type Data = {data: {getClient: {items: any[]}}}
    const messages = data.data.getClient.items;
    console.log(data)
  }

  async function createClient() {
    const client = await Auth.currentAuthenticatedUser();
    // console.log(client);
    const data = await API.graphql(graphqlOperation(mutations.createClient, {input: {id: client.username, firstName: 'Catherine', lastName: 'Swale'}})) as Data
    type Data = {data: {createClient: {items: any[]}}}
    console.log(data)
    // const messages = data.data.getClient.items;
    // console.log(messages)
  }
  return null
}