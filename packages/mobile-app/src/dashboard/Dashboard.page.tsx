import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import {mutations, subscriptions, queries} from '@theraply/lib';
import {Auth, API, graphqlOperation} from 'aws-amplify'
import {useAuth} from '../auth/auth.hooks'
import {setIsSignedIn} from '../auth/auth.slice'
import {useDispatch } from 'react-redux';


interface Therapist {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
  channelID?: string,
}

export const Dashboard = ({navigation}) => {
  const [client, setClient] = useState({} as Client)
  const [therapists, setTherapists] = useState({} as Therapist[])
  const authData = useAuth()
  const dispatch = useDispatch();

  useEffect(() => {
    fetchClient()
    fetchTherapists()
  }, [])

  async function fetchTherapists() {
    const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data
    type Data = {data: {listTherapists: {items: any[]}}}
    const therapists = data.data.listTherapists.items;
    setTherapists(therapists)
  }
  async function fetchClient() {
    const {username, attributes} = await Auth.currentAuthenticatedUser();
    const data = await API.graphql(graphqlOperation(queries.getClient, {id: username})) as Data
    type Data = {data: {getClient: any}}
    const client = data.data.getClient
    if (!client) {
      console.log('client doesnt exist in db, creating')
      await API.graphql(graphqlOperation(mutations.createClient, {input: {
        id: username,
        firstName: attributes.given_name,
        email: attributes.email,
      }}))
      fetchClient()
    } else {
      client.therapists = client.therapists.items.map(connection => ({
        ...connection.therapist,
        channelID: connection.id,
      }))
      setClient(client)
    }
  }

  return (
    <View>
      <Text>Hello {client?.firstName}</Text>
      <Text>All Therapists</Text>
      <FlatList
        data={therapists}
        renderItem={({item}) => <Card therapist={item} client={client}/>}
      />
      <Text>Your Therapists</Text>
      <FlatList
        data={client.therapists}
        renderItem={({item}) => <ClientTherapistCard therapist={item} client={client} navigation={navigation}/>}
      />
      <Button title='LOGOUT' onPress={() => signOut(dispatch)}/>

    </View>
  )
}

const Card = ({therapist, client}: {therapist: Therapist, client: Client}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CONNECT' onPress={() => createTherapistClientConnection(therapist, client)}/>
    </View>
  )
}

const ClientTherapistCard = ({therapist, client, navigation}: {therapist: Therapist, client: Client}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CHAT' onPress={() => navigation.navigate('Chat', {channelID: therapist.channelID})}/>
    </View>
  )
}

async function createTherapistClientConnection(therapist: Therapist, client: Client) {
  const res = await API.graphql(graphqlOperation(mutations.createTherapistClientRelationship, {input: {
    therapistID: therapist.id,
    clientID: client.id,
  }}))
  console.log(res)
}

async function signOut(dispatch) {
  try {
    console.log('signing out')
      await Auth.signOut();
      dispatch(setIsSignedIn(false))
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

interface Style {
  cardContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  cardContainer: {
      display: 'flex',
      padding: 8,
      margin: 8,
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 16,
  },
});