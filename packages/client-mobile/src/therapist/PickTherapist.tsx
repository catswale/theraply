import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle, GestureResponderEvent,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme } from '../theme';
import WizardStep from '../../assets/images/wizard-step-three.svg';
import Corner from '../../assets/images/bottom-left-corner-art.svg';
import BackArrow from '../../assets/images/back-arrow.svg';

interface BubbleProps {
  label: string,
  active: boolean,
  handlePress: (event: GestureResponderEvent) => void
};

interface KeyValuePair {
  [key: string]: any;
}

const Bubble = ({ label, active, handlePress }: BubbleProps) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.bubbleWrapper, ...(active ? styles.bubbleActive : {}) }}>
      <Text style={theme.normalText}>{label}</Text>
    </TouchableOpacity>
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
  'Mood Instability'
];

export const PickTherapist = ({ }) => {
  const [disabled, onChangeDisabled] = useState(false);

  const [selected, setSelected] = useState({} as KeyValuePair);

  const handleSelected = (key: Number) => () => {
    setSelected({ ...selected, [key.toString()]: !selected[key.toString()] })
  };

  async function confirmSignUp() {
    try {
    } catch (error) {
    }
  }

  const buttonStyle = disabled ? theme.primaryButtonDisabled : theme.primaryButton
  return (
    <View style={styles.container} >
      <View style={styles.headerTextContainer}>
        <TouchableOpacity style={{ position: 'relative', left: 0, top: 20 }}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={{ ...theme.normalText, textAlign: 'center', color: palette.primary.contrastText }}>Pick a Therapist.</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Corner style={{ position: 'absolute', bottom: 0 }} width={118} height={121} />
        <View style={styles.upperBodyContainer}>
          <View style={styles.graphicView}>
            <WizardStep width={75} height={5} />
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
        </View>
        <View style={styles.lowerBodyContainer}>
          <TouchableOpacity
            style={{ ...buttonStyle }}
            onPress={confirmSignUp}
            disabled={disabled}
          >
            <Text style={theme.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface Style {
  container: ViewStyle,
  headerTextContainer: ViewStyle,
  bodyContainer: ViewStyle,
  graphicView: ViewStyle,
  upperBodyContainer: ViewStyle,
  lowerBodyContainer: ViewStyle,
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
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
  },
  headerTextContainer: {
    justifyContent: 'center',
    height: '15%',
    paddingLeft: 21,
    paddingTop: 10,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '85%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 13,
  },
  upperBodyContainer: {
    paddingTop: 40,
    width: '100%',
  },
  lowerBodyContainer: {
    paddingBottom: 45,
  },
  graphicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  checkBoxContainer: {
    paddingBottom: 40,
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
  errorText: {
    color: palette.error.main,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
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
  }
});