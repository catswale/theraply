import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Button,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';
import { useClient } from '../client/client.hooks';
import ChatIcon from '../../assets/images/chat-thin.svg';
import CalendarIcon from '../../assets/images/calendar.svg';
import { useAuth } from '../auth/auth.hooks';

export const Dashboard = ({ navigation }) => {
  const { client } = useClient();
  const auth = useAuth();
  return (
    <Background
      footer={
        <>
          <Button
            onPress={() => auth.signOut()}
            title="Log Out"
            color="#841584"
          />
          <Text style={styles.warningText}>
            If you are in a life threatening situation, don't use this app. Call
            <Text style={styles.highlightedText}> 13 11 14</Text>
          </Text>
        </>
      }>
      <>
        <Text style={styles.greetingText}>Hello, {client.firstName}!</Text>
        <Text style={{ ...theme.boldText, marginBottom: 30 }}>Go ahead and book a session</Text>
        <TouchableOpacity
          style={{ ...theme.primaryButton, ...styles.iconButton, marginBottom: 20 }}
          onPress={() => navigation.navigate('PickTherapist1')}
        >
          <CalendarIcon width={28} style={styles.buttonIcon}/>
          <Text style={theme.primaryButtonText}>Book a Live Session</Text>
        </TouchableOpacity>
        {
          client?.therapists?.length === 0
          && <TouchableOpacity
            style={{ ...theme.secondaryButton, ...styles.iconButton }}
            onPress={() => navigation.navigate('PickTherapist1')}
          >
            <ChatIcon width={28} style={styles.buttonIcon}/>
            <Text style={theme.primaryButtonText}>Chat with a Therapist</Text>
          </TouchableOpacity>
        }
      </>
    </Background>
  );
};

interface Style {
  greetingText: ViewStyle,
  warningText: TextStyle,
  highlightedText: TextStyle,
  iconButton: ViewStyle,
  buttonIcon: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  greetingText: {
    ...theme.normalGrayText,
    paddingBottom: 10,
  },
  warningText: {
    ...theme.tinyGrayText,
    textAlign: 'center',
  },
  highlightedText: {
    color: palette.primary.main,
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    marginLeft: 24,
    marginRight: 17,
    color: palette.primary.contrastText,
  },
});
