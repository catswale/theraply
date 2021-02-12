import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Dimensions,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';
import People from '../../assets/images/group-people.svg';
import Logo from '../../assets/images/logo.svg';
import { useAuth } from '../auth/auth.hooks';

const {height, width} = Dimensions.get('window');


export const Landing = ({navigation}) => {
  const auth = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Logo/>
        <Text style={styles.normalText}>Get all the help you need</Text>
      </View>
      <People width={width * 0.5}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={theme.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logInButton }
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.logInButtonText}>Log In</Text>
          </TouchableOpacity>
      </View>
      </View>
  );
};

interface Style {
  container: ViewStyle,
  upperContainer: ViewStyle,
  buttonContainer: ViewStyle,
  logInButton: ViewStyle,
  logInButtonText: TextStyle,
  signUpButton: ViewStyle,
  normalText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white'
  },
  upperContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  logInButton: {
    ...theme.primaryButton,
    marginRight: 20,
    backgroundColor: palette.tertiary.main,
    flex: 1
  },
  logInButtonText: {
    ...theme.primaryButtonText,
    color: palette.tertiary.contrastText,
  },
  signUpButton: {
    ...theme.primaryButton,
    marginRight: 30,
    flex: 1,
    marginLeft: 20,
  },
  normalText: {
    ...theme.normalGrayText, 
  }
});
