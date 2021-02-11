import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, GestureResponderEvent,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';
import { useClient } from '../client/client.hooks';


export const Dashboard = () => {
  const {client} = useClient();
  return (
    <Background
      footer={
        <Text style={styles.warningText}>
          If you are in a life threatening situation, don't use this app. Call
          <Text style={styles.highlightedText}> 13 11 14</Text>
        </Text>
      }>
      <>
        <Text style={styles.greetingText}>Hello, {client.firstName}!</Text>
        <Text style={theme.boldText}>Go ahead and book a session</Text>
      </>
    </Background>
  );
};

interface Style {
  greetingText: ViewStyle,
  warningText: TextStyle,
  highlightedText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  greetingText: {
    ...theme.normalText,
    paddingBottom: 10,
  },
  warningText: {
    ...theme.tinyGrayText,
    textAlign: 'center',
  },
  highlightedText: {
    color: palette.primary.main,
  }
});
