import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Dimensions,
} from 'react-native';
import { palette, PackageItem } from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme, Background } from '../theme';
import Graphic from '../../assets/images/credit-cards.svg';
import ChatIcon from '../../assets/images/chat.svg';
import AudioIcon from '../../assets/images/audio.svg';
import CameraIcon from '../../assets/images/camera.svg';
import { RootStackParamList } from '../App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardEntry'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};
const { width } = Dimensions.get('window');

export const CardEntry = ({ navigation }: Props) => {
  const [disabled, setDisabled] = useState(true);
  const [selectedPackageItems, setSelectedPackageItems] = useState([] as PackageItem[]);
  const [firstPackageSelected, setFirstPackageSelected] = useState(false);
  const [secondPackageSelected, setSecondPackageSelected] = useState(false);

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;
  const firstPackageStyle = firstPackageSelected ? styles.packageContainerSelected : styles.packageContainer;
  const secondPackageStyle = secondPackageSelected ? styles.packageContainerSelected : styles.packageContainer;

  return (
    <Background
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={() => {}}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      }>
      <View style={styles.container}>
        <Text style={theme.boldText}>Fill this form</Text>
        
      </View>
    </Background>
  );
};

interface Style {
  container: ViewStyle,
  packagesContainer: ViewStyle,
  packageContainerSelected: ViewStyle,
  packageContainer: ViewStyle,
  priceText: TextStyle,
  packageText: TextStyle,
  packageIconsContainer: ViewStyle,
  graphic: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },
  packagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '35%',
    minHeight: 190,
  },
  packageContainer: {
    width: '45%',
    borderRadius: 30,
    borderColor: palette.tertiary.main,
    borderWidth: 2,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  packageContainerSelected: {
    width: '45%',
    borderRadius: 30,
    borderColor: palette.primary.main,
    borderWidth: 2,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  priceText: {
    color: palette.primary.main,
    fontWeight: '700',
    fontSize: 24,
  },
  packageText: {
    fontSize: 14,
    color: palette.text.primary,
    textAlign: 'center',
  },
  packageIconsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  graphic: {
    alignSelf: 'center',
  },
});
