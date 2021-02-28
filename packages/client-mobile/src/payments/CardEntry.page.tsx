import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,
  ViewStyle, TouchableOpacity, TextStyle, KeyboardAvoidingView,
  Platform, Keyboard,
} from 'react-native';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { palette } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import { Loading } from '../components/Loading.page';

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
  const [cardNo, setCardNo] = useState('');
  const [cardMonthExpiry, setCardMonthExpiry] = useState('');
  const [cardYearExpiry, setCardYearExpiry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { pkg } = route?.params || {};

  const onSubmit = async () => {
    try {
      setLoading(true);
      // const { tokenId } = await Stripe.createTokenWithCardAsync({
      //   number: cardNo,
      //   expMonth: Number(cardMonthExpiry),
      //   expYear: Number(cardYearExpiry),
      // }) as any;

      const { tokenId } = await Stripe.createTokenWithCardAsync({
        number: '4242 4242 4242 4242',
        expMonth: 2,
        expYear: 22,
      }) as any;
      navigation.navigate('ConfirmPackage', { pkg, cardTokenID: tokenId });
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formFilled = Boolean(cardNo && cardMonthExpiry && cardYearExpiry);
  const buttonStyle = !formFilled ? theme.primaryButtonDisabled : theme.primaryButton;

  if (loading) return <Loading/>;
  return (
    <Background
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={onSubmit}
          disabled={!formFilled}
        >
          <Text style={theme.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      }>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ height: '100%' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...theme.boldText, textAlign: 'center' }}>Fill this form</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ color: palette.error.main }}>{error}</Text>
              <Text style={theme.h4}>Card Number</Text>
              <TextInput
                autoCompleteType='cc-number'
                keyboardType='number-pad'
                style={{ ...theme.inputText, marginBottom: 40 }}
                onChangeText={(text) => {
                  setCardNo(text);
                }}
                value={cardNo}
              />
              <View style={styles.expiryContainer}>
                <View style={{ flex: 1, paddingRight: 40 }}>
                  <Text style={theme.h4}>Expiry Month</Text>
                  <TextInput
                    autoCompleteType='cc-exp-month'
                    keyboardType='number-pad'
                    style={{ ...theme.inputText }}
                    onChangeText={(text) => {
                      setCardMonthExpiry(text);
                    }}
                    value={cardMonthExpiry}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={theme.h4}>Expiry Year</Text>
                <TextInput
                  autoCompleteType='cc-exp-year'
                  keyboardType='number-pad'
                  style={{ ...theme.inputText, marginBottom: 40 }}
                  onChangeText={(text) => {
                    setCardYearExpiry(text);
                  }}
                  value={cardYearExpiry}
                />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
};

interface Style {
  container: ViewStyle,
  expiryContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
  },
  expiryContainer: {
    flexDirection: 'row',
  },
});
