import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button,
  ViewStyle, TouchableOpacity, TextStyle, Platform,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import WizardStep from '../../assets/images/wizard-step-three.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg'
import {Auth} from 'aws-amplify';
import {useAuth} from './auth.hooks';

export const VerifyEmail = ({route, navigation}) => {
  const {email, firstName} = route?.params;
  const [code, onChangeCode] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [checkBox, setCheckBox] = useState(false)
  const [error, setError] = useState('')
  const auth = useAuth()
  
  const updateButtonState = (code: string, checkBox: boolean) => {
    if (code && checkBox) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, code); // returns SUCCESS
      setError('')
      navigation.navigate('SignUpComplete', {firstName})
    } catch (error) {
        console.log('error verifying sign up code', error);
        setError(error.message)
    }
  }

  async function resendConfirmationCode() {
    try {
      await auth.resendConfirmationCode(email)
    } catch (err) {
      setError(err.message)
    }
  }

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <View style={styles.container} >
      <View style={styles.headerTextContainer}>
        <Text style={theme.subTitle}>Welcome!</Text>
        <Text style={theme.title}>Please verify your email.</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
        <View style={styles.upperBodyContainer}>
          <View style={styles.graphicView}>
            <WizardStep width={75} height={5}/>
          </View>
          <Text style={error ? styles.errorText : null}>{error}</Text>
          <TextInput
            style={{...theme.inputText, ...styles.inputText}}
            onChangeText={text => {
              updateButtonState(text, checkBox)
              onChangeCode(text)
            }}
            value={code}
          />
          <TouchableOpacity onPress={resendConfirmationCode}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lowerBodyContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              disabled={false}
              value={checkBox}
              onValueChange={(newValue) => {
                updateButtonState(code, newValue)
                setCheckBox(newValue)
              }}
              style={Platform.OS === 'ios' && styles.checkBox}
              boxType={'square'} // ios
              onCheckColor={palette.primary.main} // ios
              tintColor={palette.primary.main} // ios
              tintColors={{true: palette.primary.main, false: palette.primary.main}} // android
            />
            <Text style={styles.checkBoxText}>I agree with all</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                <Text style={styles.termsAndConditionsText}>{' '}Terms and Conditions</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{...buttonStyle}}
            onPress={confirmSignUp}
            disabled={disabled}
          >
            <Text style={theme.primaryButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
  upperBodyContainer: ViewStyle,
  lowerBodyContainer: ViewStyle,
  checkBoxContainer: ViewStyle,
  checkBox: ViewStyle,
  checkBoxText: TextStyle,
  errorText: TextStyle,
  inputText: ViewStyle,
  termsAndConditionsText: ViewStyle,
  resendText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
  },
  headerTextContainer: {
    justifyContent: 'center',
    height: '15%',
    paddingLeft: 21,
    paddingTop: 10,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '85%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  upperBodyContainer: {
    paddingTop: 40,
    width: '100%',
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  checkBoxContainer: {
    paddingBottom: 40,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  checkBox: {
    width: 20,
    height: 20,
  },
  checkBoxText: {
    paddingLeft: 15,
  },
  errorText: {
    color: palette.error.main,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  inputText: {
    marginBottom: 30,
  },
  termsAndConditionsText: {
    color: palette.primary.main,
  },
  resendText: {
    color: palette.primary.main, 
    alignSelf: 'center'
  }
});