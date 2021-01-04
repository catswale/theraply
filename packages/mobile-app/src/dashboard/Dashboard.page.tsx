import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import {Therapist, Client, queries} from '@theraply/lib';
import {Auth, API, graphqlOperation} from 'aws-amplify'
import {useClient} from '../client/client.hooks'
import { useBookings } from '../bookings/bookings.hooks';
import moment from 'moment-timezone'
import { useAuth } from '../auth/auth.hooks';
import * as payments from '../payments/payments'

export const Dashboard = ({navigation}) => {
  const [therapists, setTherapists] = useState({} as Therapist[])
  const {client} = useClient()
  const {bookings} = useBookings()
  const auth = useAuth()

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
      <Text>Bookings</Text>
      {
        bookings.map(b => <Text key={b.id}>{b.createdAt}</Text>)
      }
      <Button title='PAYMENTS' onPress={() => navigation.navigate('Pay')}/>
      <Button title='LOGOUT' onPress={() => auth.signOut()}/>
    </View>
  )
}

const Card = ({therapist, client}: {therapist: Therapist, client: Client}) => {
  const {createTherapistClientConnection} = useClient()

  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CONNECT' onPress={async () => {
          // createTherapistClientConnection(therapist, client)
          payments.postData()
        }}/>

    </View>
  )
}

const ClientTherapistCard = ({therapist, client, navigation}: {therapist: Therapist, client: Client}) => {
  const bookings = useBookings()

  return (
    <View style={styles.cardContainer}>
      <Text>{therapist.firstName}</Text>
      <Button title='CHAT' onPress={() => navigation.navigate('Chat', {therapist, client})}/>
      <Button title='BOOK' onPress={() => {
          const start = moment().startOf('hour').add(1, 'day')
          const end = start.clone().add(1, 'hour')
          bookings.book(therapist, start, end)
        }}/>
    </View>
  )
}

interface Style {
  cardContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  cardContainer: {
      display: 'flex',
      padding: 8,
      margin: 8,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 16,
  },
});