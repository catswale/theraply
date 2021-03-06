import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Image,
} from 'react-native';
import { theme } from '../theme';
import { palette, Therapist } from '@theraply/lib';
import {Props as DashboardProps} from './Dashboard.page';
import { useChat } from '../chat/chat.hooks';

interface Props extends DashboardProps {
  therapist: Therapist
}

export const TherapistCard = ({navigation, therapist}: Props) => {
  const {chats} = useChat();
  const chat = chats?.[therapist.id];
  const message = chat?.[chat.length - 1].body

  return (
    <TouchableOpacity 
    key={therapist.id}
    onPress={() => navigation.navigate('Chat', {therapist})}
    style={styles.container}
    >
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.avatar}
          source={{
            uri: therapist.avatarURI,
          }}
        />
        <View style={{paddingLeft: 15}}>
          <Text style={theme.boldText}>{therapist.firstName} {therapist.lastName}</Text>
          <Text style={styles.chatPreviewText}>{message}</Text>
        </View>
      </View>
      <View style={styles.newChatIndicator}/>
    </TouchableOpacity>
  )
}

interface Style {
  container: ViewStyle
  chatPreviewText: TextStyle
  avatar: ViewStyle
  newChatIndicator: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatPreviewText: {
    color: palette.primary.main,
    fontSize: 13,
    lineHeight: 18
  },
  avatar: {
    height: 50, 
    width: 50, 
    backgroundColor: palette.tertiary.main, 
    borderRadius: 100
  },
  newChatIndicator: {
    height: 11,
    width: 11,
    borderRadius: 100,
    backgroundColor: palette.secondary.main,
    alignSelf: 'flex-start'
  }
});
