import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, ViewStyle, TextStyle,
} from 'react-native';
import {
  mutations, subscriptions, queries, Message, palette,
} from '@theraply/lib';
import { API, graphqlOperation } from 'aws-amplify';
import { RootStackParamList } from '../App';
import { useChat } from './chat.hooks';
import ChatAvatar from '../../assets/images/chat-avatar.svg';
import { Background } from '../theme';
import { useClient } from '../client/client.hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Event {
  provider: object;
  value: {
    data: {
      onCreateMessage: Message
    }
  }
}

const ChatHeader = ({ name }: { name: string }) => {
  return (
    <View style={styles.chatHeader}>
      <ChatAvatar height={30} width={30} />
      <Text style={styles.chatHeaderText}>{name}</Text>
    </View>
  );
};

const ChatHeaderRight = ({ status }: { status: boolean }) => {
  return (
    <View style={styles.chatHeaderRight}>
      <Text style={{ ...styles.chatHeaderText, color: palette.text.primary }}>{status ? 'Online' : 'Typing'}</Text>
    </View>
  );
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
  const [channelID, setChannelID] = useState('');
  const { therapist } = route.params;
  const { client } = useClient();
  const chat = useChat();


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ChatHeader name={`${therapist.firstName} ${therapist.lastName}`} />
    });

    const init = async () => {
      const { data: { getClient: clientTherapist } } = await API.graphql(graphqlOperation(
        queries.getClient,
        {
          id: client.id,
          therapistId: {
            eq: therapist.id
          },
          limitTherapist: 1
        }));

      setChannelID(clientTherapist?.therapists?.items?.[0].id);
      fetchMessages();
    };

    init();
  }, []);

  async function fetchMessages() {
    const messages = await chat.fetchMessages(channelID);
    setMessages(messages);
  }

  useEffect(() => {
    const subscription = API
      .graphql(graphqlOperation(subscriptions.onCreateMessage, { owner: client.id, clientID: client.id, therapistID: therapist.id })) // @ts-ignore
      .subscribe({
        next: (event: Event) => {
          setMessages([...messages, event.value.data.onCreateMessage]);
        },
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  const handleSubmit = async () => {
    const input = {
      channelID,
      authorID: client.id,
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
              onSubmitEditing={handleSubmit}
            />
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
  borderBottomRightRadius: 10
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
    borderBottomLeftRadius: 10
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
    marginRight: 20
  }
});
