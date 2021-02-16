import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import '@aws-amplify/pubsub';
// import {Message} from '@theraply/lib';
import {
  mutations, subscriptions, queries, Message,
} from '@theraply/lib';

import './Chat.css';

interface Event {
  provider: object;
  value: {
    data: {
      onCreateMessage: Message
    }
  }
}

export const Chat = (props: any) => {
  const { channelID, participants } = props.location.state;
  const [messages, setMessages] = useState([] as Message[]);
  const [messageBody, setMessageBody] = useState('');
  const [therapistID, setTherapistID] = React.useState({});

  useEffect(() => {
    fetchMessages();
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const { username } = await Auth.currentAuthenticatedUser();
    setTherapistID(username);
  };
  useEffect(() => {
    console.log(`clientid ${participants[0]}`);
    console.log(`therapistid ${therapistID}`);
    const subscription = API
      .graphql(graphqlOperation(subscriptions.onCreateMessage, { owner: therapistID, clientID: participants[0], therapistID })) // @ts-ignore
      .subscribe({
        next: (event: Event) => {
          console.log('got message');
          console.log(event);
          setMessages([...messages, event.value.data.onCreateMessage]);
        },
      });
    console.log(subscription);
    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  async function fetchMessages() {
    const messageData = await API.graphql(graphqlOperation(queries.messagesByChannelId, {
      channelID,
      sortDirection: 'ASC',
    })) as MessageData;
    type MessageData = {data: {messagesByChannelID: {items: Message[]}}}
    const messages = messageData.data.messagesByChannelID.items;
    setMessages(messages);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageBody(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      channelID,
      authorID: therapistID,
      body: messageBody.trim(),
      therapistID,
      clientID: participants[0],
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
    <div className="container">
      <div className="messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.authorID === therapistID ? 'message me' : 'message'}>{message.body}</div>
      ))}
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            onChange={handleChange}
            value={messageBody}
          />
        </form>
      </div>
    </div>
  );
};
