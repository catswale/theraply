import React, { useState } from 'react';
import {
  ActivityIndicator, Text, StyleSheet,
  ViewStyle, View, TextStyle, Button,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';


export const Loading = () => {
  return (
    <Background
      footer={
        <>
        </>
      }>
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    </Background>
  );
};

interface Style {
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'center',
    height: '90%',
  }
});
