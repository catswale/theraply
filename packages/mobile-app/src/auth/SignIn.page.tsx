import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TextStyle,
} from 'react-native'
import {Auth} from 'aws-amplify';
import {useAuth} from './auth.hooks';

export const SignIn = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState('')
  const auth = useAuth()

  const signIn = async () => {
    try {
      await Auth.signIn(email, password);
      auth.setIsSignedIn(true)
    } catch (error) {
        console.log('error signing in', error);
        setError(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <Text>Email</Text>
      <TextInput
        autoCapitalize='none'
        autoCompleteType='email'
        style={styles.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        autoCompleteType='password'
        textContentType='password'
        secureTextEntry={true}
        autoCapitalize='none'
        style={styles.inputText}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />

      <Button title='SIGN IN' onPress={() => signIn()}/>
      <Button title='SIGN UP' onPress={() => navigation.navigate('SignUp')}/>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  inputText: ViewStyle,
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
  },
  inputText: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});