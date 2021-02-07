import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ViewStyle, TouchableOpacity, Dimensions, ImageBackground, TextStyle,
} from 'react-native'
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import WizardStep from '../../assets/images/wizard-step-three.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg'

const {width, height} = Dimensions.get('window');

export const VerifyEmail = ({navigation}) => {
  const [code, onChangeCode] = useState('');
  const [disabled, onChangeDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any)

  const updateButtonState = (code: string) => {
    if (code) {
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
        <Text style={theme.title}>Please verify your email.</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Corner style={{position: 'absolute', bottom: 0}} width={118} height={121}/>
        <View style={styles.upperBodyContainer}>
          <View style={styles.graphicView}>
            <WizardStep width={75} height={5}/>
          </View>
          <TextInput
            style={{...theme.inputText}}
            onChangeText={text => {
              updateButtonState(text)
              onChangeCode(text)
            }}
            value={code}
          />
          <Text style={styles.resendCodeText}>Resend Code</Text>
        </View>
        <View style={styles.lowerBodyContainer}>
          <TouchableOpacity
            style={{...buttonStyle}}
            onPress={() => navigation.navigate('VerifyEmail')}
            disabled={disabled}
          >
            <Text style={theme.primaryButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
  upperBodyContainer: ViewStyle,
  lowerBodyContainer: ViewStyle,
  resendCodeText: TextStyle,
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
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  upperBodyContainer: {
    height: 190,
    justifyContent: 'space-between',
    paddingTop: 40,
    width: '100%',
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  resendCodeText: {
    color: '#004AFF',
    fontSize: 16,
    textAlign: 'center',
  }
});