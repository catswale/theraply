import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button,
  ViewStyle, TouchableOpacity, TextStyle, Platform,
} from 'react-native'
import {palette} from '@theraply/lib'
import {theme} from '../theme'
import {useAuth} from './auth.hooks';

export const TermsAndConditions = ({navigation}) => {
  const auth = useAuth()

  return (
    <View style={styles.container} >
      <View style={styles.headerTextContainer}>
        <Text style={theme.title}>Terms and conditions.</Text>
      </View>
      <View style={styles.bodyContainer}>
        
      </View>
    </View>
  )
}

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
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
});