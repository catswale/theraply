import {palette} from '@theraply/lib'
import {
  StyleSheet, ViewStyle, TextStyle
} from 'react-native'

interface Style {
  title: TextStyle
  subTitle: TextStyle
  h4: TextStyle
  inputText: TextStyle
}

export const theme = StyleSheet.create<Style>({
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
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
});