import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,
  ViewStyle, TouchableOpacity, TextStyle, KeyboardAvoidingView,
  Platform, Keyboard,
} from 'react-native';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { palette, PackageItem } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import { useClient } from '../client/client.hooks';
import { usePayments } from './payments.hooks';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardEntry'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CardEntry'>;
type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp
};

export const CardEntry = ({ route, navigation }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardMonthExpiry, setCardMonthExpiry] = useState('');
  const [cardYearExpiry, setCardYearExpiry] = useState('');
  const [error, setError] = useState('');
  const {client} = useClient()
  const payments = usePayments()
  const {packages} = route.params;

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;

  const onSubmit = async () => {
    try {
      if (!client.stripeCustomerID) {
        await payments.register();
      }
      // const res = await Stripe.createTokenWithCardAsync({
      //   number: cardNo,
      //   expMonth: parseInt(cardMonthExpiry),
      //   expYear: parseInt(cardYearExpiry),
      // });
      // console.log(res);
      // await payments.addCard()
    } catch (err) {
      setError(err.friendlyMessage);
    }
  }

  return (
    <Background
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={onSubmit}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      }>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={theme.boldText}>Fill this form</Text>
            <Text style={{color: 'red'}}>{error}</Text>
            <Text style={theme.h4}>Card Number</Text>
            <TextInput
              autoCorrect={false}
              onSubmitEditing={() => {}}
              autoCompleteType='cc-number'
              keyboardType='number-pad'
              style={{ ...theme.inputText, marginBottom: 40 }}
              onChangeText={(text) => {
                setCardNo(text)
              }}
              value={cardNo}
            />
            <View>
              <Text style={theme.h4}>Expiry Month</Text>
              <TextInput
                autoCorrect={false}
                onSubmitEditing={() => {}}
                autoCompleteType='cc-exp-month'
                keyboardType='number-pad'
                style={{ ...theme.inputText, marginBottom: 40 }}
                onChangeText={(text) => {
                  setCardMonthExpiry(text)
                }}
                value={cardMonthExpiry}
            />
            <Text style={theme.h4}>Expiry Year</Text>
            <TextInput
              autoCorrect={false}
              onSubmitEditing={() => {}}
              autoCompleteType='cc-exp-year'
              keyboardType='number-pad'
              returnKeyType={'next'}
              blurOnSubmit={ false }
              style={{ ...theme.inputText, marginBottom: 40 }}
              onChangeText={(text) => {
                setCardYearExpiry(text)
              }}
              value={cardYearExpiry}
            />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
};

interface Style {
  container: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },
});
