import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Platform, PixelRatio,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { GENDERS, palette } from '@theraply/lib';

import { theme, Background } from '../../theme';
import WizardStep from '../../components/WizardStep';
import { useTherapist } from '../../therapists/therapists.hooks';

const dpi = PixelRatio.get();

type RouteParams = {
  PickTherapist2: {
    symptoms: string[];
  }
};

interface Props {
  navigation: StackNavigationProp<any, 'PickTherapist2'>;
  route: RouteProp<RouteParams, 'PickTherapist2'>;
}

interface GenderParams {
  key: number,
  gender: string,
  selectedGenders: Record<string, any>,
  setGender: Function
}

const getGenders = ({
  key,
  gender,
  selectedGenders,
  setGender,
}: GenderParams) => (
  <View key={key} style={styles.checkBoxContainer}>
    <CheckBox
      disabled={false}
      value={selectedGenders[gender]}
      onValueChange={(newValue) => {
        setGender(gender, newValue);
      }}
      style={Platform.OS === 'ios' && styles.checkBox}
      boxType={'square'} // ios
      onCheckColor={palette.primary.main} // ios
      tintColor={palette.primary.main} // ios
      tintColors={{ true: palette.primary.main, false: palette.primary.main }} // android
    />
    <Text style={styles.checkBoxText}>{gender}</Text>
  </View>
);

const StepTwo = ({ route, navigation }: Props) => {
  const [disabled, onChangeDisabled] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState({} as Record<string, any>);
  const { pickTherapist } = useTherapist();

  const setGender = (gender: string, shouldAdd: boolean) => {
    const updatedGender = { ...selectedGenders };
    if (shouldAdd) {
      updatedGender[gender] = true;
    } else {
      delete updatedGender[gender];
    }

    setSelectedGenders(updatedGender);
  };

  const handleSubmit = async () => {
    onChangeDisabled(true);
    try {
      const response = await pickTherapist({
        ...route.params,
        genders: Object.keys(selectedGenders),
      });

      navigation.navigate('PickTherapist3', {
        ...route.params,
        genders: Object.keys(selectedGenders),
        therapist: response.therapist,
      });
    } catch (err) {
      console.error(err);
    } finally {
      onChangeDisabled(false);
    }
  };

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;
  return (
    <Background
      background
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={handleSubmit}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      }>
      <>
        <View style={styles.graphicView}>
          <WizardStep stepNumber={2} />
        </View>
        <Text style={{ ...theme.boldText, textAlign: 'center' }}>What gender would you prefer?</Text>
        <View style={styles.container}>
          <Text>Gender</Text>
          <View style={styles.checkboxGroup}>
            {
              GENDERS.map((g, i) => getGenders({
                key: i, gender: g, selectedGenders, setGender,
              }))
            }
          </View>
        </View>
      </>
    </Background>
  );
};

export default StepTwo;

interface Style {
  graphicView: ViewStyle,
  checkBoxContainer: ViewStyle,
  checkBox: ViewStyle,
  checkBoxText: TextStyle,
  checkboxGroup: ViewStyle,
  container: ViewStyle,
  bubbleActive: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  checkBoxContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
  },
  checkBoxText: {
    paddingLeft: 15,
  },
  bubbleActive: {
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
  },
  checkboxGroup: {
    paddingTop: 30 / dpi,
  },
  container: {
    paddingTop: 87 / dpi,
    paddingBottom: 30 / dpi,
  },
});
