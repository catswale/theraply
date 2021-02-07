import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ViewStyle, TouchableOpacity, Dimensions, ImageBackground,
} from 'react-native'
import { Auth } from 'aws-amplify';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/boards-graphic.svg';
import WizardStep from '../../assets/images/wizard-step-two.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg'

const {width, height} = Dimensions.get('window');

export const SignUpTwo = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)

  const graphicWidth = width * 0.5
  const updateButtonState = (email: string, password: string) => {
    if (email && password) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }
  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <View style={styles.container} >
      <View style={styles.headerTextContainer}>
        <Text style={theme.subTitle}>Welcome!</Text>
        <Text style={theme.title}>Set your email and password.</Text>
      </View>
      <KeyboardAvoidingView style={styles.bodyContainer} behavior="padding">
        <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
        <View style={styles.graphicView}>
          <WizardStep width={75} height={5}/>
          <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
        </View>
        <View>
          <Text style={theme.h4}>Email Address</Text>
          <TextInput
            returnKeyType="next"
            onSubmitEditing={() => { secondInput?.focus() }}
            blurOnSubmit={false}
            style={{...theme.inputText, marginBottom: 24}}
            onChangeText={text => {
              updateButtonState(text, password)
              onChangeEmail(text)
            }}
            value={email}
          />
        </View>
        <View>
          <Text style={theme.h4}>Password</Text>
          <TextInput
            returnKeyType="next"
            ref={(input) => { onChangeSecondInput(input) }}
            style={theme.inputText}
            onChangeText={text => {
              updateButtonState(email, text)
              onChangePassword(text)
            }}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={{...buttonStyle, marginTop: 24}}
          onPress={() => navigation.navigate('VerifyEmail')}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
  },
  headerTextContainer: {
    justifyContent: 'center',
    height: '20%',
    paddingLeft: 21,
    paddingTop: 10,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
    // position: 'absolute',
    // bottom: 0,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    height: height * 0.3,
    justifyContent: 'space-around'
  },
});