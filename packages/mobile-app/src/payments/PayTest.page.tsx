import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import {AppleToken, AndroidToken} from 'expo-payments-stripe/src/utils/types'
import {API, Auth} from 'aws-amplify'
import { useClient } from '../client/client.hooks';

export const Pay = () => {
  const [card, setCard] = useState({} as AppleToken | AndroidToken)
  const {client} = useClient()

  useEffect(() => {
    if (!client.stripeCustomerID) {
      register()
    }
  }, [])

  console.log(card)
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
    
    const card = await Stripe.paymentRequestWithCardFormAsync(options);
    setCard(card)
  }

  async function register() {
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
      <Text>Pay</Text>
      <Button title='SUBMIT CARD DETAILS' onPress={() => getCardDetails()}/>
      <Button title='CREATE PAYMENT INTENT' onPress={() => register()}/>
    </View>
  )
}

