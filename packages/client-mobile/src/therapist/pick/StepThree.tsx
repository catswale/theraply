import React from 'react';
import {
  View, Text, StyleSheet,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../../theme';
import WizardStep from '../../assets/WizardStep';
import Therapist from '../../../assets/images/therapist.svg';
import VideoIcon from '../../../assets/images/camera.svg';
import MicrophoneIcon from '../../../assets/images/audio.svg';
import ChatIcon from '../../../assets/images/chat.svg';

interface Props {
  setCurrentStep: Function
}

const StepThree = ({ setCurrentStep }: Props) => {

  return (
    <Background
      header="Pick a Therapist."
      footer={
        <TouchableOpacity>
          <Text style={styles.link}>Schedule Later</Text>
        </TouchableOpacity>
      }>
      <View style={styles.wrapper}>
        <View style={styles.graphicView}>
          <WizardStep stepNumber={3} />
        </View>
        <Text style={{ ...theme.normalText, textAlign: 'center' }}>
          Congrats! You are one step closer to feeling better. And we have found you a therapist :)
        </Text>
        <View style={styles.container}>
          <Therapist />
          <Text style={{ ...theme.boldText, marginTop: 20 }}>Dr Susan Joe</Text>
          <Text style={theme.tinyGrayText}>Psychologist, Clinical Psychologist</Text>
          <View style={styles.therapistOptions}>
            <TouchableOpacity style={styles.option}><VideoIcon /></TouchableOpacity>
            <TouchableOpacity style={styles.option}><MicrophoneIcon /></TouchableOpacity>
            <TouchableOpacity style={styles.option}><ChatIcon /></TouchableOpacity>
          </View>
          <Text style={theme.boldText}>Specialisation</Text>
          <Text style={{ ...theme.normalGrayText, width: '85%', textAlign: 'center', marginBottom: 20 }}>Teens, Prenatal Pregnancy, Depression, Anxiety</Text>
          <TouchableOpacity>
            <Text style={styles.link}>View more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default StepThree;

interface Style {
  graphicView: ViewStyle,
  checkBoxContainer: ViewStyle,
  checkBox: ViewStyle,
  checkBoxText: TextStyle,
  checkboxGroup: ViewStyle,
  container: ViewStyle,
  bubbleActive: ViewStyle,
  therapistOptions: ViewStyle,
  option: ViewStyle,
  wrapper: ViewStyle,
  link: ViewStyle,
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
    marginTop: 40,
    alignItems: 'center'
  },
  therapistOptions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  option: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.fadedBlue.main,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
  },
  link: {
    textDecorationLine: 'underline',
    color: palette.primary.main,
    fontSize: 14,
    lineHeight: 26,
    textAlign: 'center',
  }
});
