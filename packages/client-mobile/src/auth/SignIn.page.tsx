import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView,
  ViewStyle, TouchableOpacity, TextStyle, Dimensions, Platform,
  TouchableWithoutFeedback, Button, Keyboard,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme } from '../theme';
import { Loading } from '../components/Loading.page';
import Corner from '../../assets/images/bottom-left-corner-art.svg';
import EnterTextGraphic from '../../assets/images/enter-text-graphic.svg';
import { useAuth } from './auth.hooks';

const { width, height } = Dimensions.get('window');

export const SignIn = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [secondInput, onChangeSecondInput] = useState(null as any);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const signIn = async () => {
    try {
      setLoading(true);
      const user = await auth.signIn(email, password);
      auth.setUser(user);
      auth.setIsSignedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateButtonState = (email: string, password: string) => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;
  if (loading) return <Loading/>;
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.headerTextContainer}>
            <Text style={theme.subTitle}>Welcome back!</Text>
            <Text style={theme.title}>Please log in</Text>
          </View>
          <View style={styles.bodyContainer}>
          <Corner style={{ position: 'absolute', bottom: 0 }} width={118} height={121}/>
            <Text style={{ color: palette.error.main }}>{error}</Text>
            <View style={styles.graphicView}>
                <EnterTextGraphic width={width * 0.6}/>
              </View>
            <View>
              <View>
                <Text style={styles.h4}>Email Address</Text>
                <TextInput
                  placeholder='example@gmail.com'
                  autoCorrect={false}
                  onSubmitEditing={() => { secondInput?.focus(); }}
                  autoCapitalize='none'
                  autoCompleteType='email'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  returnKeyType={'next'}
                  blurOnSubmit={ false }
                  style={{ ...theme.inputText, marginBottom: 40 }}
                  onChangeText={(text) => {
                    updateButtonState(text, password);
                    setEmail(text);
                  }}
                  value={email}
                />
              </View>
              <View>
              <Text style={styles.h4}>Password</Text>
              <TextInput
                ref={(input) => { onChangeSecondInput(input); }}
                autoCorrect={false}
                autoCapitalize='none'
                autoCompleteType='password'
                textContentType='password'
                secureTextEntry={true}
                style={theme.inputText}
                onChangeText={(text) => {
                  updateButtonState(email, text);
                  setPassword(text);
                }}
                value={password}
              />
              <TouchableOpacity
                disabled={disabled}
                style={{ ...buttonStyle, marginTop: 24 }}
                onPress={signIn}
              >
                <Text style={theme.primaryButtonText}>Done</Text>
              </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

interface Style {
  container: ViewStyle,
  inner: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
  lowerBodyContainer: ViewStyle,
  middleBodyContainer: ViewStyle,
  welcomeText: TextStyle,
  title: TextStyle,
  h4: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: palette.secondary.main,
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  headerTextContainer: {
    justifyContent: 'center',
    height: '15%',
    paddingLeft: 21,
    paddingTop: 30,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    height: '85%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  middleBodyContainer: {
    alignItems: 'center',
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
  h4: {
    ...theme.h4,
    marginBottom: 15,
  },
});
