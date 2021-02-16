import React, { useEffect } from 'react'
import {
  View, Text
} from 'react-native'
import { Provider } from 'react-redux';
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Chat } from './chat/Chat.page';
import { Dashboard } from './dashboard/Dashboard.page';
import { SignIn } from './auth/SignIn.page';
import { Landing } from './auth/Landing.page';
import { SignUp } from './auth/SignUpOne.page';
import { SignUpTwo } from './auth/SignUpTwo.page';
import { VerifyEmail } from './auth/VerifyEmail.page';
import { TermsAndConditions } from './auth/TermsAndConditions.page';
import { SignUpComplete } from './auth/SignUpComplete.page';
import { Pay } from './payments/PayTest.page';
import { useAuth } from './auth/auth.hooks';
import { PickTherapist } from './client/pick-therapist';
import { palette } from '@theraply/lib';
import { theme } from './theme';
import BackArrow from './components/BackArrow';
import { Loading } from './components/Loading.page';
// import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

const Stack = createStackNavigator();

const App = () => {
  const { isSignedIn, loading } = useAuth()

  useEffect(() => {
    // Stripe.setOptionsAsync({
    //   publishableKey: 'pk_test_51HyBbcLY5UjkiodXb5bxgUvEC0CqWqEA7OXytdhiE3XaMc2Tf0IiLOCSnwgKeaNJv4jo8D8ydIIyRSHXFj80p9PX00BJ4fuKgV',
    //   androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
    //   merchantId: 'theraply', // [optional] used for payments with ApplePay
    // });
  }, [])

  if (loading) return <Loading/>
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {
          isSignedIn ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Home'}}/>
              <Stack.Screen name="PickTherapist" component={PickTherapist}/>
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Pay" component={Pay} />
            </>
          ) : (
              <>
                <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
                <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
                <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
                <Stack.Screen options={{ headerShown: false }} name="SignUpTwo" component={SignUpTwo} />
                <Stack.Screen options={{ headerShown: false }} name="VerifyEmail" component={VerifyEmail} />
                <Stack.Screen options={{ headerShown: false }} name="TermsAndConditions" component={TermsAndConditions} />
                <Stack.Screen options={{ headerShown: false }} name="SignUpComplete" component={SignUpComplete} />
              </>
            )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions: StackNavigationOptions = {
  title: 'Theraply',
  headerStyle: {
    backgroundColor: palette.secondary.main,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleStyle: {
    ...theme.normalText,
    color: palette.primary.contrastText,
  },
  headerBackImage: BackArrow,
  headerTitleAlign: 'center',
}

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper
