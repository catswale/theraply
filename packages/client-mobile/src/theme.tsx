import {palette} from '@theraply/lib'
import {
  StyleSheet, ViewStyle, TextStyle, View
} from 'react-native'

interface Style {
  title: TextStyle
  subTitle: TextStyle
  h4: TextStyle
  inputText: TextStyle
  primaryButton: ViewStyle
  primaryButtonDisabled: ViewStyle
  primaryButtonText: ViewStyle
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
    backgroundColor: palette.backgroundColor, 
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
  }
});