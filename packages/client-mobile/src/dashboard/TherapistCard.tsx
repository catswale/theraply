import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Button,
} from 'react-native';
import { theme } from '../theme';
import { palette, Therapist } from '@theraply/lib';

export const TherapistCard = ({therapist}: {therapist: Therapist}) => {
  return (
    <View key={therapist.id} style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.avatar}/>
        <View style={{paddingLeft: 15}}>
          <Text style={theme.boldText}>{therapist.firstName} {therapist.lastName}</Text>
          <Text style={styles.chatPreviewText}>Hello Jane how may I help you</Text>
        </View>
      </View>
      <View style={styles.newChatIndicator}/>
    </View>
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
    backgroundColor: 
    palette.tertiary.main, 
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
