import React from 'react';
import {
  View, Text, StyleSheet, Button,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import TickComplete from '../../assets/images/tick-complete.svg';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PaymentComplete'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'PaymentComplete'>;
type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp
};

export const PaymentComplete = ({ route, navigation }: Props) => (
    <Background
      footer={
        <View>
          <TouchableOpacity
            style={theme.primaryButton}
            onPress={() => {
              navigation.navigate('Dashboard'); // todo update
            }}
          >
            <Text style={theme.primaryButtonText}>Schedule a Session</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard'); // todo update
              }}
            >
              <Text style={styles.bottomText}>Schedule a Session</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard'); // todo update
              }}
            >
              <Text style={styles.bottomText}>Chat with Therapist</Text>
            </TouchableOpacity>
          </View>
        </View>

      }>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* Put step graphic here */}
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <TickComplete />
          <Text style={styles.descText}>You purchase was successful.</Text>
        </View>
      </View>
    </Background>
);

interface Style {
  container: ViewStyle,
  descText: TextStyle,
  bottomText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  descText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 40,
  },
  bottomText: {
    color: palette.primary.main,
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 40,
  },
});
