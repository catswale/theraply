import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle, TextInput, TouchableOpacity,
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
  const graphicWidth = width * 0.5
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={theme.title}>Please, input your details</Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <View style={styles.graphicView}>
        <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
      </View>
      <Text style={theme.h4}>Email Address</Text>
      <TextInput
        placeholder='example@gmail.com'
        autoCapitalize='none'
        autoCompleteType='email'
        style={theme.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text style={{...theme.h4, ...styles.passwordText}}>Password</Text>
      <TextInput
        autoCompleteType='password'
        textContentType='password'
        secureTextEntry={true}
        autoCapitalize='none'
        style={theme.inputText}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={signIn}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  graphicView: ViewStyle,
  welcomeText: TextStyle,
  button: ViewStyle,
  buttonText: TextStyle,
  passwordText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
      display: 'flex',
      paddingTop: 40,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 16,
      paddingHorizontal: 13,
      justifyContent: 'center'
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  welcomeText: {
    fontSize: 16,
    color: palette.gray,
    marginBottom: 10,
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