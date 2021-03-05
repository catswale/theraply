import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Button,
} from 'react-native';
import { palette } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { useClient } from '../client/client.hooks';
import Cancel from '../../assets/images/cancel.svg';
import Card from '../../assets/images/card.svg';
import User from '../../assets/images/user.svg';
import { useAuth } from '../auth/auth.hooks';
import { RootStackParamList } from '../App';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Menu'
>;
type Props = {navigation: ScreenNavigationProp};

export const Menu = ({ navigation }: Props) => {
  const { client } = useClient();
  const auth = useAuth();
  const resetNav = () => navigation.reset({
    index: 0,
    routes: [
      { name: 'Dashboard' },
    ],
  });

  return (
    <View style={{height: '100%', backgroundColor: palette.secondary.main}}>
      <View style={{backgroundColor: palette.secondary.main, height: '35%'}}>
        <View style={styles.userContainer}>
          <View style={styles.userAvatar}>
            <User/>
          </View>
          <Text style={styles.nameText}>{client.firstName} {client.lastName}</Text>
          <Text style={styles.emailText}>{client.email}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuRows}>
          <TouchableOpacity style={styles.menuRow}>
            <Card/>
            <Text style={styles.menuItemText}>Payment</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={auth.signOut}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={resetNav}>
          <Cancel style={{marginLeft: 20}}/>
        </TouchableOpacity>
    </View>
  );
};

interface Style {
  cancelButton: ViewStyle
  userContainer: ViewStyle
  userAvatar: ViewStyle
  nameText: TextStyle
  emailText: TextStyle
  menuContainer: ViewStyle
  logoutText: TextStyle
  menuRows: ViewStyle
  menuRow: ViewStyle
  menuItemText: TextStyle
}

const styles = StyleSheet.create<Style>({
  cancelButton: {
    position: 'absolute',
    marginTop: 40,
  },
  userContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: palette.tertiary.main,
    borderRadius: 100,
    height: 69,
    width: 69,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    marginTop: 20,
    color: palette.secondary.contrastText,
    fontWeight: '700',
    fontSize: 16
  },
  emailText: {
    marginTop: 3,
    color: palette.secondary.contrastText,
    fontWeight: '400',
    fontSize: 13
  },
  menuContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: palette.background.default,
    height: '65%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoutText: {
    color: palette.primary.main,
    textDecorationLine: 'underline',
    fontSize: 14,
    marginBottom: 46,
  },
  menuRows: {
    width: '100%',
    marginTop: 39,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
  },
  menuItemText: {
    marginLeft: 13,
  }
});
