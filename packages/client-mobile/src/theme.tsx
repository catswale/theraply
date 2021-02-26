import React from 'react';
import { palette } from '@theraply/lib';
import {
  View, StyleSheet,
  ViewStyle, TextStyle, Dimensions,
} from 'react-native';
import Corner from '../assets/images/bottom-left-corner-art.svg';

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

const { height } = Dimensions.get('window');

export const theme = StyleSheet.create<Style>({
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: palette.secondary.contrastText,
  },
  subTitle: {
    fontSize: 16,
    color: palette.gray,
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
    paddingLeft: 16,
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
    lineHeight: 26,
  },
  normalText: {
    color: palette.text.primary,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 26,
  },
  tinyGrayText: {
    color: palette.text.grey2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 'normal',
  },
  normalGrayText: {
    color: palette.text.grey2,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  container: {
    backgroundColor: palette.secondary.main,
    height,
  },
  bodyContainer: {
    display: 'flex',
    height: 0.89 * height,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  upperBodyContainer: {
    paddingTop: 40,
    flex: 7,
  },
  lowerBodyContainer: {
    paddingBottom: 45,
    flex: 3,
    justifyContent: 'center',
  },
});

interface BackgroundProps {
  children: JSX.Element;
  footer: JSX.Element;
  background?: boolean;
}

export const Background = ({ children, footer, background }: BackgroundProps) => (
    <View style={theme.container} >
      <View style={theme.bodyContainer}>
        <View style={theme.upperBodyContainer}>
          {children}
        </View>
        <View style={theme.lowerBodyContainer}>
          {footer}
          {background && (
            <Corner style={{
              position: 'absolute', left: -18, zIndex: -1, bottom: 0,
            }} width={188} height={191} />
          )}
        </View>
      </View>
    </View>
);
