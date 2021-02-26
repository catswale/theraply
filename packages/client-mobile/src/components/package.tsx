import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TextStyle,
} from 'react-native';
import { Package, PackageName } from '@theraply/lib';
import ChatIcon from '../../assets/images/chat.svg';
import AudioIcon from '../../assets/images/audio.svg';
import CameraIcon from '../../assets/images/camera.svg';

export const PackageIcons = ({ pkg }: {pkg: Package}) => {
  if (pkg.name === PackageName.Texting) {
    return (
      <View style={{ ...styles.packageIconsContainer, justifyContent: 'center' }}>
        <ChatIcon/>
      </View>
    );
  } if (pkg.name === PackageName.TextingAndLiveSession) {
    return (
      <View style={styles.packageIconsContainer}>
        <ChatIcon/>
        <AudioIcon/>
        <CameraIcon/>
      </View>
    );
  }
  return null;
};

interface Style {
  packageIconsContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  packageIconsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
