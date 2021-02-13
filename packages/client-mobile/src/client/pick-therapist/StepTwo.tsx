import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../../theme';
import WizardStep from '../../components/WizardStep';
import CheckBox from '@react-native-community/checkbox';
import Corner from '../../../assets/images/bottom-left-corner-art.svg';


interface Props {
  navigation: StackNavigationProp<any, 'PickTherapist2'>;
  route: RouteProp<any, 'PickTherapist2'>;
}

interface KeyValuePair {
  [key: string]: any;
}

const genders = [
  "Female",
  "Male",
  "Transgender",
  "Gender Neutral",
  "Indigenous Australian",
  "Other"
];

interface GenderParams {
  key: number,
  gender: string,
  selectedGenders: KeyValuePair,
  setGender: Function
}

const getGenders = ({ key, gender, selectedGenders, setGender }: GenderParams) => (
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
  const [selectedGenders, setSelectedGenders] = useState({} as KeyValuePair);

  const setGender = (gender: string, shouldAdd: boolean) => {
    const updatedGender = { ...selectedGenders };
    if (shouldAdd) {
      updatedGender[gender] = true;
    } else {
      delete updatedGender[gender];
    }

    setSelectedGenders(updatedGender);
  };

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <Background
      background={
        <Corner style={{ position: 'absolute', bottom: 0 }} width={118} height={121} />
      }
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={() => navigation.navigate('PickTherapist3', {
            ...route.params,
            genders: Object.keys(selectedGenders)
          })}
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
              genders.map((g, i) => getGenders({ key: i, gender: g, selectedGenders, setGender }))
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
    alignItems: 'center'
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
    marginTop: 30,
  },
  container: {
    marginTop: 87,
  }
});
