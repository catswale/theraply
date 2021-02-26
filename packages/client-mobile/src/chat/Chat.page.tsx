import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TextStyle,
} from 'react-native';
import {
  mutations, subscriptions, queries, Message, palette,
} from '@theraply/lib';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { useChat } from './chat.hooks';
import { useAuth } from '../auth/auth.hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EmojiIcon from '../../assets/images/emoji.svg';
import MicrophoneIcon from '../../assets/images/microphone-icon.svg';
import AttachmentIcon from '../../assets/images/attachment-icon.svg';
import CalendarIcon from '../../assets/images/calendar-icon.svg';
import ChatAvatar from '../../assets/images/chat-avatar.svg';
import { Background } from '../theme';

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

export const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [messageBody, setMessageBody] = React.useState('');
  const { therapist } = route.params;
  const { user: client } = useAuth();
  const chat = useChat();
  // This value is most likely gotten from a graphql subscription
  const [isOnline, setOnlineStatus] = useState(true);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ChatHeader name={`${therapist.firstName} ${therapist.lastName}`} />
    });
    fetchMessages();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ChatHeaderRight status={isOnline} />
    });
  }, [isOnline]);

  async function fetchMessages() {
    const messages = await chat.fetchMessages(therapist.channelID);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = {
      channelID: therapist.channelID,
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
            <TouchableOpacity>
              <EmojiIcon width={15} height={15} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MicrophoneIcon width={10} height={16} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AttachmentIcon width={14} height={15} />
            </TouchableOpacity>
            <TouchableOpacity>
              <CalendarIcon width={13} height={14} />
            </TouchableOpacity>
          </View>
        </View>
      }>
      <View style={styles.messages}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={message.authorID === client.id ? styles.messageMe : styles.message}>
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
  backgroundColor: '#f1f0f0',
  borderRadius: 16,
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
    backgroundColor: '#f19e38',
    color: 'white',
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
    width: '60%',
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
