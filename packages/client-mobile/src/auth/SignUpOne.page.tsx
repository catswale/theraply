import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ViewStyle, TouchableOpacity, Dimensions, Platform,
} from 'react-native'
import { Auth } from 'aws-amplify';
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
    <View style={styles.container} >
      <View style={styles.headerTextContainer}>
        <Text style={theme.subTitle}>Welcome!</Text>
        <Text style={theme.title}>Lets have your name.</Text>
      </View>
      <KeyboardAvoidingView contentContainerStyle={{backgroundColor: 'white', width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30}} style={styles.bodyContainer} behavior={Platform.OS === "ios" ? "position" : "height"}>
        <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
        <View style={styles.graphicView}>
          <WizardStep width={75} height={5}/>
          <Graphic width={graphicWidth} height={graphicWidth * 0.7} />
        </View>
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
        <TouchableOpacity
          style={{...buttonStyle, marginTop: 24}}
          onPress={() => navigation.navigate('SignUpTwo')}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Next</Text>
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