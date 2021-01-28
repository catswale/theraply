import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Button, ViewStyle, TextStyle, TextInput, TouchableOpacity,
} from 'react-native'
import {Auth} from 'aws-amplify';
import {useAuth} from './auth.hooks';
import {colors} from '@theraply/lib'
// import {TextInput} from '../components/TextInput'

export const SignIn = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.headerText}>Please, input your details</Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <Text style={styles.h2}>Email Address</Text>
      <TextInput
        autoCapitalize='none'
        autoCompleteType='email'
        style={styles.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text style={styles.h2}>Password</Text>
      <TextInput
        autoCompleteType='password'
        textContentType='password'
        secureTextEntry={true}
        autoCapitalize='none'
        style={styles.inputText}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={signIn}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      {/* <Button style={styles.button} title='Done' onPress={() => signIn()}/> */}
      {/* <Button title='SIGN UP' onPress={() => navigation.navigate('SignUp')}/> */}
    </View>
  )
}

interface Style {
  container: ViewStyle,
  inputText: ViewStyle,
  welcomeText: TextStyle,
  headerText: TextStyle,
  h2: TextStyle,
  button: ViewStyle,
  buttonText: TextStyle,
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
  },
  inputText: {
    height: 50, 
    borderColor: colors.borderBlue,
    backgroundColor: colors.backgroundColor, 
    borderWidth: 1,
    borderRadius: 31,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
  },
  h2: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.primary.main,
    height: 56,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: colors.primary.contrastText,
    fontSize: 16,
  }
});