import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import {
  palette, Packages, Package,
} from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import { PackageIcons } from '../components/package';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmPackage'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmPackage'>;
type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp
};

export const ConfirmPackage = ({ route, navigation }: Props) => {
  const { pkg } = route?.params || {};
  return (
    <Background
      footer={
        <TouchableOpacity
          style={theme.primaryButton}
          onPress={() => {
            // navigation.navigate();
          }}
        >
          <Text style={theme.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      }>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...theme.boldText, textAlign: 'center' }}>Please confirm your package</Text>
        </View>
        <View style={{ flex: 2 }}>
          <PackageView pkg={pkg}/>
        </View>
      </View>
    </Background>
  );
};

const PackageView = ({ pkg }: {pkg: Package}) => (
    <View style={styles.packageView}>
      <View style={styles.priceCircle}>
        <Text style={styles.priceText}>${pkg.price / 100}</Text>
      </View>
      <Text style={styles.descText}>{pkg.desc}</Text>
      <PackageIcons pkg={pkg}/>
    </View>
);

interface Style {
  container: ViewStyle,
  packageView: ViewStyle,
  priceCircle: ViewStyle,
  priceText: TextStyle,
  descText: TextStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  packageView: {
    width: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceCircle: {
    height: 100,
    width: 100,
    backgroundColor: palette.tertiary.main,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceText: {
    fontSize: 24,
    color: palette.primary.main,
    fontWeight: '700',
  },
  descText: {
    textAlign: 'center',
  },
});
