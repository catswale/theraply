import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TextStyle,
} from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';

export const SignUpConfirm = ({navigation}) => {
  const [code, onChangeCode] = React.useState('');
  const [email, onChangeEmail] = React.useState('');

  const onPress = () => {
    confirmSignUp(email, code)
    navigation.navigate('SignIn')
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up Confirm</Text>
      <Text>Email</Text>
      <TextInput
        autoCapitalize='none'
        autoCompleteType='email'
        style={styles.inputText}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <Text>Code (check your email)</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => onChangeCode(text)}
        value={code}
      />
      
      <Button title='CONFIRM' onPress={onPress}/>
    </View>
  )
}

async function confirmSignUp(email: string, code: string) {
  try {
    const result = await Auth.confirmSignUp(email, code);
    console.log(result)
  } catch (error) {
      console.log('error confirming sign up', error);
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