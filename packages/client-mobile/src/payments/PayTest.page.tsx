import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import { PaymentsStripe } from 'expo-payments-stripe';
import {AppleToken, AndroidToken} from 'expo-payments-stripe/src/utils/types'
import {API, Auth} from 'aws-amplify'
import { useClient } from '../client/client.hooks';


export const Pay = () => {
  const [card, setCard] = useState({} as AppleToken | AndroidToken)
  const [clientSecret, setClientSecret] = useState('pi_1I7CoKLY5UjkiodXddLc3OU4_secret_005NKboRCFXKx1wy1qDf0CUPN')
  const {client} = useClient()

  useEffect(() => {
    if (!client.stripeCustomerID) {
      // register()
    }
  }, [])

  async function getCardDetails() {
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: 'Georgia',
          country: 'US',
          postalCode: '31217',
        },
      },
    };
    
    const card = await PaymentsStripe.paymentRequestWithCardFormAsync(options);
    setCard(card)
    console.log(card)
  }

  async function register() {
    console.log('register')
    try {
      console.log(`${(await Auth.currentSession()).getIdToken().getJwtToken()}`)
      const myInit = { 
        headers: {Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
        body: {
          email: client.email,
          firstName: client.firstName,
        }
      };
      const res =  await API.post('paymentAPI', '/payment/register', myInit);
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async function createPaymentIntent() {
    try {
      const myInit = { 
        headers: {Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
      };
      const res =  await API.post('paymentAPI', '/payment/register', myInit);
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <Button title='SUBMIT CARD DETAILS' onPress={() => getCardDetails()}/>
      <Button title='CREATE PAYMENT INTENT' onPress={() => register()}/>
      <Button title='MAKE PAYMENT' onPress={() => {

      }}/>
    </View>
  )
}

