import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import {mutations, subscriptions, queries} from '@theraply/lib';
import {Auth, API, graphqlOperation} from 'aws-amplify'
import {useAuth} from '../auth/auth.hooks'
import {setIsSignedIn} from '../auth/auth.slice'
import {useDispatch } from 'react-redux';

interface Client {
  id: string,
  firstName: string,
  lastName?: string,
  email: string,
  phoneNumber?: string,
  therapists?: any[],
}

interface Therapist {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
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
    type Data = {data: {getClient: Client}}
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
      setClient(client)
    }
  }

  return (
    <View>
      <Text>Hello {client?.firstName}</Text>
      <Text>All Therapists</Text>
      <FlatList
        data={therapists}
        renderItem={({item}) => <Card therapist={item}/>}
      />
      <Button title='LOGOUT' onPress={() => signOut(dispatch)}/>

    </View>
  )
}

const Card = ({therapist}: {therapist: Therapist}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CONNECT' onPress={() => {}}/>
    </View>
  )
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