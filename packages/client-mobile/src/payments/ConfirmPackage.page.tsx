import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import {
  palette, Package,
} from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { theme, Background } from '../theme';
import { RootStackParamList } from '../App';
import { PackageIcons } from '../components/package';
import { useClient } from '../client/client.hooks';
import { usePayments } from './payments.hooks';
import { Loading } from '../components/Loading.page';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { pkg, cardTokenID } = route?.params || {};
  const { client } = useClient();
  const payments = usePayments();

  const onSubmit = async () => {
    try {
      // setLoading(true);
      let { stripeCustomerID } = client;
      // if (!stripeCustomerID) {
      //   stripeCustomerID = await payments.register();
      // }
      // await payments.addCard(stripeCustomerID, cardTokenID);
      await payments.register(cardTokenID, pkg.name);
      // await payments.charge(stripeCustomerID, pkg.name);
      // navigation.navigate('PaymentComplete');
    } catch (err) {
      setError(err.friendlyMessage);
    } finally {
      // setLoading(false);
    }
  };
  if (loading) return <Loading/>
  return (
    <Background
      footer={
        <TouchableOpacity
          style={theme.primaryButton}
          onPress={onSubmit}
        >
          <Text style={theme.primaryButtonText}>Confirm</Text>
        </TouchableOpacity>
      }>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...theme.boldText, textAlign: 'center' }}>Please confirm the purchase</Text>
          <Text style={{ color: palette.error.main }}>{error}</Text>
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
