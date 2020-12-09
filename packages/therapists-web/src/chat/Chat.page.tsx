/* src/App.js */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import '@aws-amplify/pubsub';
import { onCreateMessage } from 'graphql/subscriptions';
import { messagesByChannelId } from 'graphql/queries';
import { createMessage } from 'graphql/mutations';
import './Chat.css'

interface Message {
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
  const [messageBody, setMessageBody] = useState('');
  const [userID, setUserID] = React.useState({});

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
    console.log('getting messages')
    const messageData = await API.graphql(graphqlOperation(messagesByChannelId, {
      channelID: '1',
      sortDirection: 'ASC'
    })) as MessageData
    console.log(messageData)
    type MessageData = {data: {messagesByChannelID: {items: Message[]}}}
    const messages = messageData.data.messagesByChannelID.items;
    setMessages(messages)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setMessageBody(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  
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
    <div className="container">
      <div className="messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.authorID === userID ? 'message me' : 'message'}>{message.body}</div>
        ))}
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Type your message here"
            onChange={handleChange}
            value={messageBody}
          />
        </form>
      </div>
    </div>
  );
}
