import React from 'react';
import { palette } from '@theraply/lib';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';

interface Style {
  title: TextStyle
  subTitle: TextStyle
  h4: TextStyle
  inputText: TextStyle
  primaryButton: ViewStyle
  primaryButtonDisabled: ViewStyle
  primaryButtonText: ViewStyle
  secondaryButton: ViewStyle
  secondaryButtonText: TextStyle
  boldText: ViewStyle,
  normalText: ViewStyle,
  tinyGrayText: ViewStyle,
  normalGrayText: ViewStyle,
  container: ViewStyle,
  bodyContainer: ViewStyle,
  upperBodyContainer: ViewStyle,
  lowerBodyContainer: ViewStyle,
}

export const theme = StyleSheet.create<Style>({
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
    color: palette.secondary.contrastText
  },
  subTitle: {
    fontSize: 16,
    color: palette.gray,
    marginBottom: 10,
  },
  h4: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  inputText: {
    height: 50,
    borderColor: palette.borderBlue,
    backgroundColor: palette.background.default,
    borderWidth: 1,
    borderRadius: 31,
    paddingLeft: 16
  },
  primaryButton: {
    backgroundColor: palette.primary.main,
    height: 56,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: palette.primary.action.disabledBackground,
    height: 56,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: palette.primary.contrastText,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: palette.secondary.main,
    height: 56,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: palette.primary.contrastText,
    fontSize: 16,
  },
  boldText: {
    color: palette.text.primary,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26
  },
  normalText: {
    color: palette.text.primary,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 26
  },
  tinyGrayText: {
    color: palette.text.grey2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 'normal',
  },
  normalGrayText: {
    color: palette.text.grey2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  upperBodyContainer: {
    paddingTop: 40,
    width: '100%',
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
});

interface BackgroundProps {
  children: JSX.Element;
  footer: JSX.Element;
  background?: JSX.Element;
}

export const Background = ({ children, footer, background }: BackgroundProps) => {
  return (
    <View style={theme.container} >
      <View style={theme.bodyContainer}>
        {background}
        <View style={theme.upperBodyContainer}>
          {children}
        </View>
        <View style={theme.lowerBodyContainer}>
          {footer}
        </View>
      </View>
    </View>
  )
};
