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

const {height} = Dimensions.get('window');


export const Landing = ({navigation}) => {
  const auth = useAuth();
  return (
    <Background
      footer={
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
      }>
      <View style={styles.bodyContainer}>
        <Logo/>
        <Text style={styles.normalText}>Get all the help you need</Text>
        <People/>
      </View>
    </Background>
  );
};

interface Style {
  bodyContainer: ViewStyle,
  buttonContainer: ViewStyle,
  logInButton: ViewStyle,
  logInButtonText: TextStyle,
  signUpButton: ViewStyle,
  normalText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  logInButton: {
    ...theme.primaryButton,
    marginRight: 7,
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
    marginLeft: 7,
  },
  normalText: {
    ...theme.normalGrayText, 
    marginBottom: height * 0.09
  }
});
