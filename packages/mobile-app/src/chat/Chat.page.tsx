import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ViewStyle, TextStyle,
} from 'react-native'
import { messagesByChannelId } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';
import { createMessage } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'

interface Message { // todo move to shared lib
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Event {
  provider: object;
  value: {
    data: {
      onCreateMessage: Message
    }
  }
}

export const Chat = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [messageBody, setMessageBody] = React.useState('');
  const [userID, setUserID] = React.useState('');
  useEffect(() => {
    fetchMessages()
    fetchUserInfo()
  }, []);

  const fetchUserInfo = async () => {
    const {username} = await Auth.currentAuthenticatedUser()
    setUserID(username)
  }

  useEffect(() => {
    const subscription = API
      .graphql(graphqlOperation(onCreateMessage)) // @ts-ignore
      .subscribe({
        next: (event: Event) => { 
          setMessages([...messages, event.value.data.onCreateMessage]);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);
  
  async function fetchMessages() {
    const messageData = await API.graphql(graphqlOperation(messagesByChannelId, {
      channelID: '1',
      sortDirection: 'ASC'
    })) as MessageData
    type MessageData = {data: {messagesByChannelID: {items: Message[]}}}
    const messages = messageData.data.messagesByChannelID.items;
    setMessages(messages)
  }

  const handleSubmit = async (event) => {
    const input = {
      channelID: '1',
      authorID: userID,
      body: messageBody.trim()
    };
  
    try {
      setMessageBody('');
      // @ts-ignore
      await API.graphql(graphqlOperation(createMessage, { input }))
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
      {messages.map((message) => (
        <View
          key={message.id}
          style={message.authorID === userID ? styles.messageMe : styles.message}>
            <Text style={styles.text}>{message.body}</Text>
          </View>
        ))}
      </View>
      <View style={styles.chatBar}>
        <TextInput 
        style={styles.chatBarInput}
        defaultValue="Type your message here"
        value={messageBody}
        onChangeText={(text) => setMessageBody(text)}
        />
        <Button title='Submit' onPress={handleSubmit}/>
      </View>
    </View>
  )
}

interface Style {
  container: ViewStyle;
  messages: ViewStyle;
  message: ViewStyle;
  messageMe: ViewStyle;
  text: TextStyle;
  chatBar: ViewStyle;
  chatBarInput: ViewStyle;
}

const message: ViewStyle = {
  alignSelf: 'flex-start',
  marginTop: 4,
  paddingVertical: 8,
  paddingHorizontal: 12,
  maxWidth: 240,
  backgroundColor: '#f1f0f0',
  borderRadius: 16,
}
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
    color: 'white'
  },
  text: {
    fontSize: 16,
  },
  chatBar: {
    flexDirection: 'row',
    height: 64,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  chatBarInput: {
    width: '80%',
    height: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
  }
});