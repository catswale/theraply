import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, GestureResponderEvent,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../../theme';
import WizardStep from '../../components/WizardStep';
import Corner from '../../../assets/images/bottom-left-corner-art.svg';

interface BubbleProps {
  label: string,
  active: boolean,
  handlePress: (event: GestureResponderEvent) => void
}

interface KeyValuePair {
  [key: string]: any;
}

const Bubble = ({ label, active, handlePress }: BubbleProps) => (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.bubbleWrapper, ...(active ? styles.bubbleActive : {}) }}>
      <Text style={theme.normalText}>{label}</Text>
    </TouchableOpacity>
);

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
];

interface Props {
  setCurrentStep: Function
}

const StepOne = ({ setCurrentStep }: Props) => {
  const [disabled, onChangeDisabled] = useState(false);

  const [selected, setSelected] = useState({} as KeyValuePair);

  const handleSelected = (key: Number) => () => {
    setSelected({ ...selected, [key.toString()]: !selected[key.toString()] });
  };

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton;
  return (
    <Background
      background={
        <Corner style={{ position: 'absolute', bottom: 0 }} width={118} height={121} />
      }
      footer={
        <TouchableOpacity
          style={{ ...buttonStyle }}
          onPress={() => setCurrentStep(2)}
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
          <View style={styles.bubbleContainer}>
            {
              symptoms.map((symptom, i) => (
                <Bubble
                  active={selected[i.toString()]}
                  handlePress={handleSelected(i)}
                  key={i}
                  label={symptom} />
              ))
            }
          </View>
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
  bubbleWrapper: ViewStyle,
  bubbleContainer: ViewStyle,
  symptomsContainer: ViewStyle,
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
    paddingBottom: 40,
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
  bubbleWrapper: {
    paddingLeft: 39,
    paddingRight: 39,
    paddingTop: 12,
    paddingBottom: 12,
    minWidth: 115,
    maxWidth: 205,
    color: palette.fadedBlue.contrastText,
    height: 50,
    backgroundColor: palette.fadedBlue.main,
    borderRadius: 31,
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 20,
  },
  bubbleActive: {
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
  },
  bubbleContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  symptomsContainer: {
    marginTop: 87,
  },
});
