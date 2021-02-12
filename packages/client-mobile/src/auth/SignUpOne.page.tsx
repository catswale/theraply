import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ViewStyle, TouchableOpacity, Dimensions, Platform, TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import Graphic from '../../assets/images/enter-text-graphic.svg';
import WizardStep from '../../assets/images/wizard-step-one.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg'

const {width, height} = Dimensions.get('window');

export const SignUp = ({navigation}) => {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)

  const updateButtonState = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      onChangeDisabled(false)
    } else {
      onChangeDisabled(true)
    }
  }
  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.headerTextContainer}>
            <Text style={theme.subTitle}>Welcome!</Text>
            <Text style={theme.title}>Lets have your name.</Text>
          </View>
          <View style={styles.bodyContainer}>
          
            <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
            <WizardStep width={75} height={5} style={styles.graphic}/>
            <Graphic width={width * 0.5} style={styles.graphic}/>
            <View>
              <View>
                <Text style={theme.h4}>First Name</Text>
                <TextInput
                  textContentType='givenName'
                  returnKeyType="next"
                  autoCompleteType='name'
                  onSubmitEditing={() => { secondInput?.focus() }}
                  blurOnSubmit={false}
                  style={{...theme.inputText, marginBottom: 24}}
                  onChangeText={text => {
                    updateButtonState(text, lastName)
                    onChangeFirstName(text)
                  }}
                  value={firstName}
                />
              </View>
              <View>
                <Text style={theme.h4}>Last Name</Text>
                <TextInput
                  textContentType='familyName'
                  returnKeyType="next"
                  ref={(input) => { onChangeSecondInput(input) }}
                  style={theme.inputText}
                  onChangeText={text => {
                    updateButtonState(firstName, text)
                    onChangeLastName(text)
                  }}
                  value={lastName}
                />
              </View>
            </View>
            
            <TouchableOpacity
              style={{...buttonStyle, marginTop: 24}}
              onPress={() => navigation.navigate('SignUpTwo', {firstName})}
              disabled={disabled}
            >
              <Text style={theme.primaryButtonText}>Next</Text>
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
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: palette.secondary.main,
    flex: 1
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
    paddingTop: 10,
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
});