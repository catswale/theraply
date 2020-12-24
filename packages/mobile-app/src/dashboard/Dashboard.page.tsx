import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import {mutations, Client, queries} from '@theraply/lib';
import {Auth, API, graphqlOperation} from 'aws-amplify'
import {useAuth} from '../auth/auth.hooks'
import {setIsSignedIn} from '../auth/auth.slice'
import {useDispatch } from 'react-redux';
import {useClient} from '../client/client.hooks'

interface Therapist {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
  channelID?: string,
}

export const Dashboard = ({navigation}) => {
  const [therapists, setTherapists] = useState({} as Therapist[])
  const dispatch = useDispatch();
  const {client} = useClient()
  useEffect(() => {
    fetchTherapists()
  }, [])

  async function fetchTherapists() {
    const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data
    type Data = {data: {listTherapists: {items: any[]}}}
    const therapists = data.data?.listTherapists?.items || [];
    setTherapists(therapists)
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
  const {fetchClient} = useClient()

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

  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CONNECT' onPress={() => {
          createTherapistClientConnection(therapist, client)
        }}/>
    </View>
  )
}

const ClientTherapistCard = ({therapist, client, navigation}: {therapist: Therapist, client: Client}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CHAT' onPress={() => navigation.navigate('Chat', {therapist, client})}/>
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