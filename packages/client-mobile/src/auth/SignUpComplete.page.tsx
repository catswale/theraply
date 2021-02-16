import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,
  ViewStyle, TouchableOpacity, TextStyle, Platform,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme } from '../theme';
import WizardStep from '../../assets/images/wizard-step-four.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg';
import TickComplete from '../../assets/images/tick-complete.svg';

export const SignUpComplete = ({ route, navigation }) => {
  const firstName = route?.params?.firstName;

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={theme.title}>Finito!</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Corner style={{ position: 'absolute', bottom: 0 }} width={118} height={121}/>
        <View style={styles.upperBodyContainer}>
          <View style={styles.graphicView}>
            <WizardStep width={75} height={5}/>
          </View>
        </View>
        <View style={styles.middleBodyContainer}>
          <TickComplete style={styles.tickComplete} width={106} height={106}/>
          <Text style={styles.welcomeText}>Welcome {firstName}</Text>
          <Text style={{ ...theme.title, ...styles.title }}>Your account has been verified successfully.</Text>
        </View>
        <View style={styles.lowerBodyContainer}>
          <TouchableOpacity
            style={theme.primaryButton}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={theme.primaryButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
  upperBodyContainer: ViewStyle,
  lowerBodyContainer: ViewStyle,
  middleBodyContainer: ViewStyle,
  tickComplete: ViewStyle,
  welcomeText: TextStyle,
  title: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
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
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  upperBodyContainer: {
    paddingTop: 40,
    width: '100%',
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  middleBodyContainer: {
    alignItems: 'center',
  },
  tickComplete: {
    marginBottom: 60,
  },
  welcomeText: {
    color: palette.text.grey2,
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    color: palette.text.primary,
    textAlign: 'center',
  },
});
