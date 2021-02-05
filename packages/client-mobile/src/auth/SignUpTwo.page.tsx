import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TouchableOpacity, Dimensions,
} from 'react-native'
import { Auth } from 'aws-amplify';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/signin.svg';

const {width, height} = Dimensions.get('window');

export const SignUpTwo = ({navigation}) => {
  const [firstName, onChangeFirstName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const onPress = () => {
    signUp(firstName, email, password)
    navigation.navigate('SignUpConfirm')
  }

  const graphicWidth = width * 0.5

  return (
    <View style={styles.container}>
      <Text style={theme.subTitle}>Welcome!</Text>
      <Text style={theme.title}>Lets have your name.</Text>
      <View style={styles.graphicView}>
        <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
      </View>
      <Text style={theme.h4}>First Name</Text>
      <TextInput
        style={theme.inputText}
        onChangeText={text => onChangeFirstName(text)}
        value={firstName}
      />
      <Text style={theme.h4}>Email</Text>
      <TextInput
        autoCapitalize='none'
        autoCompleteType='email'
        style={theme.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text style={theme.h4}>Password</Text>
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
        style={theme.primaryButton}
        onPress={onPress}
      >
        <Text style={theme.primaryButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

async function signUp(firstName: string, email: string, password: string) {
  try {
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
  graphicView: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingHorizontal: 13,
  },
  inputText: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
});