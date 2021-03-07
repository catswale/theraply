import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,
  ViewStyle, TouchableOpacity, ScrollView, KeyboardAvoidingView,
  Platform, Keyboard, Dimensions,
} from 'react-native';
import { palette } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import { useClient } from '../client/client.hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {height} = Dimensions.get('window');

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Payments'
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export const Payments = ({ navigation }: Props) => {
  const {client} = useClient();
  const packageName = client.packageItems?.[0]?.packageName || 'None';
  return (
    <Background
      footer={
        <>
        </>
      }>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{ height: height * 0.6 }}>
        <TouchableOpacity
            onPress={() => navigation.navigate('ChoosePackage')}
          >
            <Text style={{ color: palette.primary.main }}>Payment Flow</Text>
          </TouchableOpacity>
          <Text>Current Package: {packageName}</Text>
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
};

interface Style {
  container: ViewStyle,
  expiryContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
  },
  expiryContainer: {
    flexDirection: 'row',
  },
});
