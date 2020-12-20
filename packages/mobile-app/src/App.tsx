import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native'
import { Provider } from 'react-redux';
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { registerRootComponent } from 'expo';
import {Chat} from './chat/Chat.page';
import {Dashboard} from './dashboard/Dashboard.page';
import {SignIn} from './auth/SignIn.page';
import {SignUp} from './auth/SignUp.page';
import {SignUpConfirm} from './auth/SignUpConfirm.page';
import { useAuth } from './auth/auth.hooks';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
})

const Stack = createStackNavigator();

const App = () => {
  const {isSignedIn, loading} = useAuth()

  if (loading) return <View><Text>Loading...</Text></View>
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isSignedIn ? (
            <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Chat" component={Chat} />
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
const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SignIn" component={H} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const H = () => {
  return (
    <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Hello, world!</Text>
        </View>
  )
}

export default registerRootComponent(AppWrapper)