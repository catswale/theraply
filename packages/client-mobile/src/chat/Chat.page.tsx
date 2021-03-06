import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, ViewStyle, TextStyle,
  Image,
} from 'react-native';
import {
  mutations, subscriptions, Therapist, Message, palette,
} from '@theraply/lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../App';
import { useChat } from './chat.hooks';
import { Background } from '../theme';
import { useClient } from '../client/client.hooks';
import ChatSendIcon from '../../assets/images/send-arrow.svg';

interface Event {
  provider: object;
  value: {
    data: {
      onCreateMessage: Message
    }
  }
}

const ChatHeader = ({ therapist }: { therapist: Therapist }) => {
  const name = `${therapist.firstName} ${therapist.lastName}`;
  return (
    <View style={styles.chatHeader}>
      <Image
            style={styles.avatar}
            source={{
              uri: therapist.avatarURI,
            }}
          />
      <Text style={styles.chatHeaderText}>{name}</Text>
    </View>
  )
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp
};

export const Chat = ({ route, navigation }: Props) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [messageBody, setMessageBody] = useState('');
  const { therapist } = route.params;
  const { client } = useClient();
  const chat = useChat();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ChatHeader therapist={therapist} />,
    });

    const init = async () => {
      fetchMessages();
    };

    init();
  }, []);

  async function fetchMessages() {
    setMessages(await chat.fetchMessages(therapist.relationship.id));
  }

  useEffect(() => {
    const subscription = API
      .graphql(graphqlOperation(subscriptions.onCreateMessage, {
        owner: client.id,
        clientID: client.id,
        therapistID: therapist.id,
      })) // @ts-ignore
      .subscribe({
        next: (event: Event) => {
          const message = event.value.data.onCreateMessage;
          chat.addMessage(therapist.id, message);
          setMessages([...messages, message]);
        },
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  const handleSubmit = async () => {
    const input = {
      channelID: therapist.relationship.id,
      body: messageBody.trim(),
      clientID: client.id,
      therapistID: therapist.id,
    };

    try {
      setMessageBody('');
      // @ts-ignore
      await API.graphql(graphqlOperation(mutations.createMessage, { input }));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Background
      background
      footer={
        <View style={styles.chatBar}>
          <View style={styles.chatBox}>
            <TextInput
              style={styles.chatBarInput}
              placeholder="Type something..."
              value={messageBody}
              onChangeText={(text) => setMessageBody(text)}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.chatSend}>
              <ChatSendIcon height={14} width={14} />
            </TouchableOpacity>
          </View>
        </View>
      }>
      <View style={styles.messages}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={message.owner === client.id ? styles.messageMe : styles.message}>
            <Text style={styles.text}>{message.body}</Text>
          </View>
        ))}
      </View>
    </Background>
  );
};

interface Style {
  container: ViewStyle;
  messages: ViewStyle;
  message: ViewStyle;
  messageMe: ViewStyle;
  text: TextStyle;
  chatBar: ViewStyle;
  chatBarInput: ViewStyle;
  chatBox: ViewStyle;
  chatHeader: ViewStyle;
  chatHeaderText: ViewStyle;
  chatHeaderRight: ViewStyle;
  chatSend: ViewStyle;
  avatar: ViewStyle
}

const message: ViewStyle = {
  alignSelf: 'flex-start',
  marginTop: 4,
  paddingVertical: 8,
  paddingHorizontal: 12,
  maxWidth: 240,
  backgroundColor: palette.gray,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
};
const styles = StyleSheet.create<Style>({
  container: {
    display: 'flex',
    paddingTop: 40,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  messages: {
    flex: 1,
    position: 'relative',
  },
  message,
  messageMe: {
    ...message,
    alignSelf: 'flex-end',
    backgroundColor: palette.fadedBlue.main,
    color: palette.fadedBlue.contrastText,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  chatBox: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: palette.gray,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  chatBar: {
    flexDirection: 'row',
    height: 64,
    position: 'absolute',
    bottom: 40,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  chatBarInput: {
    width: '90%',
    height: '100%',
  },
  chatHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chatHeaderText: {
    color: palette.primary.contrastText,
    marginLeft: 5,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 26,
  },
  chatHeaderRight: {
    marginRight: 20,
  },
  chatSend: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 30, 
    width: 30, 
    backgroundColor: palette.tertiary.main, 
    borderRadius: 100
  }
});
