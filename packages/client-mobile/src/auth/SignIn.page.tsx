import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native'
import {Auth} from 'aws-amplify';
import {useAuth} from './auth.hooks';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/signin.svg';

const {width, height} = Dimensions.get('window');

export const SignIn = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)
  const [error, setError] = useState('')
  const auth = useAuth()

  const signIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      auth.setIsSignedIn(true)
      auth.setUser(user)
    } catch (error) {
        console.log('error signing in', error);
        setError(error.message)
    }
  }

  const updateButtonState = (email: string, password: string) => {
    if (email && password) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }
  console.log(disabled)
  const graphicWidth = width * 0.5
  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={theme.subTitle}>Welcome Back!</Text>
      <Text style={theme.title}>Please, input your details</Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <View style={styles.graphicView}>
        <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
      </View>
      <View>
        <Text style={theme.h4}>Email Address</Text>
        <TextInput
          placeholder='example@gmail.com'
          onSubmitEditing={() => { secondInput?.focus() }}
          autoCapitalize='none'
          autoCompleteType='email'
          returnKeyType={'next'}
          blurOnSubmit={ false }
          style={theme.inputText}
          onChangeText={text => {
            updateButtonState(text, password)
            onChangeEmail(text)
          }}
          value={email}
        />
        <Text style={{...theme.h4, ...styles.passwordText}}>Password</Text>
        <TextInput
          ref={(input) => { onChangeSecondInput(input) }}
          autoCompleteType='password'
          textContentType='password'
          secureTextEntry={true}
          autoCapitalize='none'
          style={theme.inputText}
          onChangeText={text => {
            updateButtonState(email, text)
            onChangePassword(text)
          }}
          value={password}
        />
      </View>

      <TouchableOpacity
        disabled={disabled}
        style={{...buttonStyle, marginTop: 24}}
        onPress={signIn}
      >
        <Text style={theme.primaryButtonText}>Done</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

interface Style {
  container: ViewStyle,
  graphicView: ViewStyle,
  button: ViewStyle,
  buttonText: TextStyle,
  passwordText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 13,
      justifyContent: 'center'
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  passwordText: {
    paddingTop: 16,
  },
  button: {
    backgroundColor: palette.primary.main,
    height: 56,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.04,
  },
  buttonText: {
    color: palette.primary.contrastText,
    fontSize: 16,
  }
});