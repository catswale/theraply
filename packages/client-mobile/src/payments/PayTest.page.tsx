import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ViewStyle, Button, FlatList,
} from 'react-native';
import { PaymentsStripe } from 'expo-payments-stripe';
import { AppleToken, AndroidToken } from 'expo-payments-stripe/src/utils/types';
import { API, Auth } from 'aws-amplify';
import { useClient } from '../client/client.hooks';
import { usePayments } from './payments.hooks';

export const Pay = () => {
  const [card, setCard] = useState({} as AppleToken | AndroidToken);
  const [clientSecret, setClientSecret] = useState('pi_1I7CoKLY5UjkiodXddLc3OU4_secret_005NKboRCFXKx1wy1qDf0CUPN');
  const { client } = useClient();
  const { register } = usePayments();
  useEffect(() => {
    if (!client.stripeCustomerID) {
      register();
    }
  }, []);

  async function getCardDetails() {
    const res = await PaymentsStripe.createTokenWithCardAsync({
      number: '4242 4242 4242 4242',
      expMonth: 10,
      expYear: 2022,
      cvc: '424',
      addressCountry: 'Australia',
    });
    console.log(res);

    // const card = await PaymentsStripe.paymentRequestWithCardFormAsync(options);
    // setCard(card);
    // console.log(card);
  }

  async function createPaymentIntent() {
    try {
      const myInit = {
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
      };
      const res = await API.post('paymentAPI', '/payment/register', myInit);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      <Button title='SUBMIT CARD DETAILS' onPress={() => getCardDetails()}/>
      {/* <Button title='CREATE PAYMENT INTENT' onPress={() => register()}/>
      <Button title='MAKE PAYMENT' onPress={() => {

      }}/> */}
    </View>
  );
};
