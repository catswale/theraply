import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native'
import { Provider } from 'react-redux';
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Chat} from './chat/Chat.page';
import {Dashboard} from './dashboard/Dashboard.page';
import {SignIn} from './auth/SignIn.page';
import {SignUp} from './auth/SignUp.page';
import {SignUpConfirm} from './auth/SignUpConfirm.page';
import {Pay} from './payments/PayTest.page';
import { useAuth } from './auth/auth.hooks';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

const Stack = createStackNavigator();

const App = () => {
  const {isSignedIn, loading} = useAuth()

  useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_51HyBbcLY5UjkiodXb5bxgUvEC0CqWqEA7OXytdhiE3XaMc2Tf0IiLOCSnwgKeaNJv4jo8D8ydIIyRSHXFj80p9PX00BJ4fuKgV',
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      merchantId: 'theraply', // [optional] used for payments with ApplePay
    });
  }, [])

  if (loading) return <View><Text>Loading...</Text></View>
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isSignedIn ? (
            <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Pay" component={Pay} />
            </>
          ) : (
            <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUpConfirm" component={SignUpConfirm} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper