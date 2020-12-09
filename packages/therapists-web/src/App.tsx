/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import '@aws-amplify/pubsub';
import { onCreateMessage } from './graphql/subscriptions';
import { messagesByChannelId } from './graphql/queries';
import { createMessage } from './graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

interface Message {
  id: string;
  channelID: string;
  author: string;
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


const App = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    fetchMessages()
  }, []);

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setMessageBody(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  
    const input = {
      channelID: '1',
      author: 'Dave',
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
          className={message.author === 'Dave' ? 'message me' : 'message'}>{message.body}</div>
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

export default withAuthenticator(App)