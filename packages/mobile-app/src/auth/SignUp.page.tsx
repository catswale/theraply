import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TextStyle,
} from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';

export const SignUp = ({navigation}) => {
  const [firstName, onChangeFirstName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const onPress = () => {
    signUp(firstName, email, password)
    navigation.navigate('SignUpConfirm')
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <Text>First Name</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => onChangeFirstName(text)}
        value={firstName}
      />
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

      <Button title='SIGN UP' onPress={onPress}/>
    </View>
  )
}

async function signUp(firstName: string, email: string, password: string) {
  try {
    console.log(firstName)
      const result = await Auth.signUp({
          username: email,
          password,
          attributes: {
              given_name: firstName,
              email,
          }
      });
      console.log(result)
  } catch (error) {
      console.log('error signing up:', error);
  }
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