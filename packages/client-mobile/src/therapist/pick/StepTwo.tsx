import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Platform,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../../theme';
import WizardStep from '../../assets/WizardStep';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  setCurrentStep: Function
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
  currentGender: string,
  setGender: Function
}

const getGenders = ({ key, gender, currentGender, setGender }: GenderParams) => (
  <View key={key} style={styles.checkBoxContainer}>
    <CheckBox
      disabled={false}
      value={currentGender === gender}
      onValueChange={(newValue) => {
        setGender(newValue ? gender : '');
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

const StepTwo = ({ setCurrentStep }: Props) => {
  const [disabled, onChangeDisabled] = useState(false);
  const [gender, setGender] = useState('');

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <Background
      header="Pick a Therapist."
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={() => setCurrentStep(3)}
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
              genders.map((g, i) => getGenders({ key: i, gender: g, currentGender: gender, setGender }))
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