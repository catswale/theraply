import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, Platform, PixelRatio,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { palette } from '@theraply/lib';
import { theme, Background } from '../../theme';
import WizardStep from '../../components/WizardStep';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const dpi = PixelRatio.get();

interface BubbleProps {
  label: string,
  active: boolean,
  handlePress: (value: boolean) => void
};

interface KeyValuePair {
  [key: string]: any;
}

const Bubble = ({ label, active, handlePress }: BubbleProps) => {
  return (
    <View style={styles.checkBoxContainer}>
      <CheckBox
        value={active}
        onValueChange={handlePress}
        style={Platform.OS === 'ios' && styles.checkBox}
        boxType={'square'} // ios
        onCheckColor={palette.primary.main} // ios
        tintColor={palette.primary.main} // ios
        tintColors={{ true: palette.primary.main, false: palette.primary.main }} // android
      />
      <Text style={styles.checkBoxText}>{label}</Text>
    </View>
  )
};

const symptoms = [
  'Depression',
  'Grief',
  'Relationship',
  'Addiction',
  'Life Changes',
  'Anxiety',
  'Disordered Eating',
  'Other',
  'Mood Instability',

  'Depression',
  'Grief',
  'Relationship',
  'Addiction',
  'Life Changes',
  'Anxiety',
  'Disordered Eating',
  'Other',
  'Mood Instability',
];

interface Props {
  navigation: StackNavigationProp<any, 'PickTherapist1'>;
}

const StepOne = ({ navigation }: Props) => {
  const [disabled, onChangeDisabled] = useState(false);

  const [selected, setSelected] = useState({} as KeyValuePair);

  const handleSelected = (key: string) => () => {
    setSelected({ ...selected, [key.toString()]: !selected[key.toString()] })
  };

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;
  return (
    <Background
      background
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={() => navigation.navigate('PickTherapist2', {
            symptoms: Object.keys(selected)
          })}
          disabled={disabled}
        >
          <Text style={theme.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      }>
      <>
        <View style={styles.graphicView}>
          <WizardStep stepNumber={1} />
        </View>
        <Text style={{ ...theme.boldText, textAlign: 'center' }}>What are you experiencing?</Text>
        <View style={styles.symptomsContainer}>
          <Text>Symptoms</Text>
          <ScrollView style={styles.bubbleContainer}>
            {
              symptoms.map((symptom, i) => (
                <Bubble
                  active={selected[symptom]}
                  handlePress={handleSelected(symptom)}
                  key={i}
                  label={symptom} />
              ))
            }
          </ScrollView>
        </View>
      </>
    </Background>
  );
};

export default StepOne;

interface Style {
  graphicView: ViewStyle,
  checkBoxContainer: ViewStyle,
  checkBox: ViewStyle,
  checkBoxText: TextStyle,
  errorText: TextStyle,
  inputText: ViewStyle,
  termsAndConditionsText: ViewStyle,
  bubbleContainer: ViewStyle,
  symptomsContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40 / dpi,
  },
  checkBoxContainer: {
    paddingBottom: 15 / dpi,
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
  errorText: {
    color: palette.error.main,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputText: {
    marginBottom: 30,
  },
  termsAndConditionsText: {
    color: palette.primary.main,
  },
  bubbleContainer: {
    marginTop: 30 / dpi,
  },
  symptomsContainer: {
    paddingTop: 87 / dpi,
    paddingBottom: 30 / dpi,
  }
});
