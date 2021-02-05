import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ViewStyle, TouchableOpacity, Dimensions,
} from 'react-native'
import { Auth } from 'aws-amplify';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/signin.svg';

const {width, height} = Dimensions.get('window');

export const SignUp = ({navigation}) => {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)

  const graphicWidth = width * 0.5
  const updateButtonState = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }
  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={theme.subTitle}>Welcome!</Text>
      <Text style={theme.title}>Lets have your name.</Text>
      <View style={styles.graphicView}>
        <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
      </View>
      <Text style={theme.h4}>First Name</Text>
      <TextInput
        returnKeyType="next"
        onSubmitEditing={() => { secondInput?.focus() }}
        blurOnSubmit={false}
        style={{...theme.inputText, marginBottom: 24}}
        onChangeText={text => {
          updateButtonState(text, lastName)
          onChangeFirstName(text)
        }}
        value={firstName}
      />
      <Text style={theme.h4}>Last Name</Text>
      <TextInput
        returnKeyType="next"
        ref={(input) => { onChangeSecondInput(input) }}
        style={theme.inputText}
        onChangeText={text => {
          updateButtonState(firstName, text)
          onChangeLastName(text)
        }}
        value={lastName}
      />
      <TouchableOpacity
        style={{...buttonStyle, marginTop: 24}}
        onPress={() => navigation.navigate('SignUpTwo')}
        disabled={disabled}
      >
        <Text style={theme.primaryButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

interface Style {
  container: ViewStyle,
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
  graphicView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
});