import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Button, ViewStyle, TextStyle,
} from 'react-native'

export const TextInput = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
      style={styles.container}
      onChangeText={text => onChangeText(text)}
      value={value}
  />
  )
}

interface Style {
  container: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: { 
    height: 100, 
    borderColor: 'gray', 
    borderWidth: 1 
  }
});