import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import { palette, Therapist } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme, Background } from '../theme';
import { useClient } from '../client/client.hooks';
import ChatIcon from '../../assets/images/chat-thin.svg';
import CalendarIcon from '../../assets/images/calendar.svg';
import Menu from '../../assets/images/menu.svg';
import { useAuth } from '../auth/auth.hooks';
import { RootStackParamList } from '../App';
import { callAPI } from '../services/api';
import { useTherapist } from '../therapists/therapists.hooks';
import {TherapistCard} from './TherapistCard'

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
export type Props = {navigation: ScreenNavigationProp};

export const Dashboard = ({ navigation }: Props) => {
  const { client } = useClient();
  const {therapists} = useTherapist();
  useEffect(() => {
    navigation.setOptions({headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Menu style={{marginLeft: 20, marginBottom: 5}}/>
      </TouchableOpacity>
    ),});
  }, [])

  const packageName = client.packageItems?.[0]?.packageName || 'None';
  return (
    <Background
      footer={
        <>
          <Text style={styles.warningText}>
            If you are in a life threatening situation, don't use this app. Call Lifeline on
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
          <CalendarIcon width={28} style={styles.buttonIcon} />
          <Text style={theme.primaryButtonText}>Book a Live Session</Text>
        </TouchableOpacity>
        {
          therapists?.length === 0
          && <TouchableOpacity
            style={{ ...theme.secondaryButton, ...styles.iconButton }}
            onPress={() => navigation.navigate('PickTherapist1')}
          >
            <ChatIcon width={28} style={styles.buttonIcon} />
            <Text style={theme.primaryButtonText}>Chat with a Therapist</Text>
          </TouchableOpacity>
        }
        {/* <TouchableOpacity
            onPress={() => navigation.navigate('ChoosePackage')}
          >
            <Text style={{ color: palette.primary.main }}>Payment Flow</Text>
          </TouchableOpacity>
          <Text>Current Package: {packageName}</Text> */}
          <Text style={{marginBottom: 15}}>Chats</Text>
          {
            therapists.map((t) => <TherapistCard key={t.id} therapist={t} navigation={navigation}/>)
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
