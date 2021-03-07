import React, { useEffect } from 'react';
import { Dimensions, Button } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { palette, Package } from '@theraply/lib';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { STRIPE_KEY } from '@env'; // eslint-disable-line
import { Chat } from './chat/Chat.page';
import { Dashboard } from './dashboard/Dashboard.page';
import { Menu } from './dashboard/Menu.page';
import { SignIn } from './auth/SignIn.page';
import { Landing } from './auth/Landing.page';
import { SignUp } from './auth/SignUpOne.page';
import { SignUpTwo } from './auth/SignUpTwo.page';
import { VerifyEmail } from './auth/VerifyEmail.page';
import { TermsAndConditions } from './auth/TermsAndConditions.page';
import { SignUpComplete } from './auth/SignUpComplete.page';
import { useAuth } from './auth/auth.hooks';
import { PickTherapist } from './client/pick-therapist';
import { theme } from './theme';
import { Loading } from './components/Loading.page';
import {
  ChoosePackage, CardEntry, ConfirmPackage, PaymentComplete, Payments,
} from './payments';
import store from './store';
import {Therapist} from '@theraply/lib';

export type RootStackParamList = {
  Dashboard: undefined;
  Menu: undefined;
  PickTherapist1: undefined;
  PickTherapist2: {
    therapist: Therapist;
  };
  PickTherapist3: {
    symptoms: string[];
    genders: string[];
    therapist: Therapist;
  };
  Chat: {
    therapist: Therapist;
  };
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpTwo: undefined;
  VerifyEmail: undefined;
  TermsAndConditions: undefined;
  SignUpComplete: undefined;
  ChoosePackage: undefined;
  CardEntry: {pkg: Package};
  ConfirmPackage: {pkg: Package, cardTokenID: string};
  PaymentComplete: undefined;
  Payments: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const { height } = Dimensions.get('window');

const App = () => {
  const { isSignedIn, loading } = useAuth();

  useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey: STRIPE_KEY,
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      merchantId: 'merchant.com.theraply.app', // [optional] used for payments with ApplePay
    });
  }, []);

  if (loading) return <Loading/>;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {
          isSignedIn ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Home'}} />
              <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
              <Stack.Screen name="Payments" component={Payments} options={{ title: 'Payments'}} />
              <Stack.Screen name="ChoosePackage" component={ChoosePackage} options={{ title: 'Package' }} />
              <Stack.Screen name="PaymentComplete" component={PaymentComplete} options={{ title: 'Complete' }} />
              <Stack.Screen name="ConfirmPackage" component={ConfirmPackage} options={{ title: 'Confirm' }} />
              <Stack.Screen name="PickTherapist1" options={{ title: 'Pick a Therapist.' }} component={PickTherapist.StepOne} />
              <Stack.Screen name="PickTherapist2" options={{ title: 'Pick a Therapist.' }} component={PickTherapist.StepTwo} />
              <Stack.Screen name="PickTherapist3" options={{ title: 'Pick a Therapist.' }} component={PickTherapist.StepThree} />
              <Stack.Screen name="CardEntry" component={CardEntry} options={{ title: 'Payment' }} />
              <Stack.Screen name="Chat" component={Chat} />
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
};

const screenOptions: StackNavigationOptions = {
  title: 'Theraply',
  headerStyle: {
    backgroundColor: palette.secondary.main,
    shadowColor: 'transparent',
    elevation: 0,
    height: 0.11 * height,
  },
  headerTitleStyle: {
    ...theme.normalText,
    color: palette.primary.contrastText,
  },
  headerTintColor: palette.secondary.contrastText,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};

const AppWrapper = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

export default AppWrapper;
