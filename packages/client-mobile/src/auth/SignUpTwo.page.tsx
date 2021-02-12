import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ViewStyle, TouchableOpacity, Dimensions, Platform, TouchableWithoutFeedback,
  Keyboard, TextStyle
} from 'react-native'
import { Auth } from 'aws-amplify';
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/boards-graphic.svg';
import WizardStep from '../../assets/images/wizard-step-two.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg'
import { useAuth } from './auth.hooks';

const {width, height} = Dimensions.get('window');

export const SignUpTwo = ({route, navigation}) => {
  const firstName = route?.params?.firstName;
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)
  const auth = useAuth()

  const updateButtonState = (email: string, password: string) => {
    if (email && password) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }
  async function signUp() {
    await auth.signUp(firstName, email, password);
    navigation.navigate('VerifyEmail', {email, firstName})
  }

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.subTitle}>Welcome!</Text>
            <Text style={theme.title}>Set your details.</Text>
          </View>
          <View style={styles.bodyContainer}>
          
            <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
            <WizardStep width={75} height={5} style={styles.graphic}/>
            <Graphic width={width * 0.5} style={styles.graphic}/>
            <View>
              <Text style={theme.h4}>Email Address</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
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
              <Text style={theme.h4}>Password</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                autoCompleteType='password'
                returnKeyType="next"
                textContentType='newPassword'
                secureTextEntry={true}
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
              onPress={signUp}
              disabled={disabled}
            >
              <Text style={theme.primaryButtonText}>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

interface Style {
  container: ViewStyle,
  inner: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphic: ViewStyle,
  subTitle: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: palette.secondary.main,
  },
  inner: {
    flex: 1,
    justifyContent: "space-evenly",
    width: '100%'
  },
  headerTextContainer: {
    justifyContent: 'center',
    height: '15%',
    paddingLeft: 21,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '85%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
    flex: 1,
  },
  graphic: {
    alignSelf: 'center'
  },
  subTitle: {
    ...theme.subTitle,
    marginBottom: 8,
  }
});