import React from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions,
  ViewStyle, TouchableOpacity, TextStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { palette, Therapist } from '@theraply/lib';
import { RootStackParamList } from '../../App';
import { theme, Background } from '../../theme';
import WizardStep from '../../components/WizardStep';
import VideoIcon from '../../../assets/images/camera.svg';
import MicrophoneIcon from '../../../assets/images/audio.svg';
import ChatIcon from '../../../assets/images/chat.svg';

const { width } = Dimensions.get('window');


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PickTherapist3'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'PickTherapist3'>;
type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp
};

const StepThree = ({ route, navigation }: Props) => {
  const { therapist = {} }: {therapist: Therapist} = route?.params;
  return (
    <Background
      background
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
          <Image
            style={styles.avatar}
            source={{
              uri: therapist.avatarURI,
            }}
          />
          <Text style={{ ...theme.boldText, marginTop: 20 }}>Dr {`${therapist.firstName} ${therapist.lastName}`}</Text>
          <Text style={theme.tinyGrayText}>{therapist.bio as string}</Text>
          <View style={styles.therapistOptions}>
            <View style={styles.option}><VideoIcon /></View>
            <View style={styles.option}><MicrophoneIcon /></View>
            <View style={styles.option}><ChatIcon /></View>
          </View>
          <Text style={theme.boldText}>Specialisation</Text>
          <Text style={{
            ...theme.normalGrayText, width: '85%', textAlign: 'center', marginBottom: 20,
          }}>{(therapist.specializations as Array<string>)?.join(', ')}</Text>
          <TouchableOpacity onPress={() => { 
            navigation?.navigate('Chat', {
              therapist
            })
          }}>
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
  avatar: ViewStyle,
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
    marginTop: 30,
  },
  container: {
    marginTop: 40,
    alignItems: 'center',
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
  },
  avatar: {
    height: width * 0.4, 
    width: width * 0.4,
    backgroundColor: palette.tertiary.main, 
    borderRadius: 100
  },
});
