import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle, TextInput, TouchableOpacity,
} from 'react-native'
import {Auth} from 'aws-amplify';
import {useAuth} from './auth.hooks';
import {colors} from '@theraply/lib'
import Graphic from '../../assets/images/signin.svg';

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
  const {width} = Dimensions.get('window');
  const graphicWidth = width * 0.5
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.headerText}>Please, input your details</Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <View style={styles.graphicView}>
        <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
      </View>
      <Text style={styles.h2}>Email Address</Text>
      <TextInput
        autoCapitalize='none'
        autoCompleteType='email'
        style={styles.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text style={{...styles.h2, ...styles.passwordText}}>Password</Text>
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
    </View>
  )
}

interface Style {
  container: ViewStyle,
  graphicView: ViewStyle,
  inputText: ViewStyle,
  welcomeText: TextStyle,
  headerText: TextStyle,
  h2: TextStyle,
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
    paddingBottom: 45,
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
  passwordText: {
    paddingTop: 16,
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