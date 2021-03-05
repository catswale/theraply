import React, { useState, useEffect } from 'react';
import {
  Message,
  subscriptions,
  queries,
  mutations,
} from '@theraply/lib/src';
import { graphqlOperation, API } from 'aws-amplify';
import styles from './style.module.css';

interface Event {
  provider: object;
  value: {
    data: {
      onCreateMessage: Message
    }
  }
}

type ChatMessageProps = {
  location: {
    state: ChatProps
  }
};

const ChatMessage = (props: ChatMessageProps) => {
  const {
    channelID,
    participants,
    therapistID,
    chatInfo,
  } = props.location.state;
  const [messages, setMessages] = useState([
    {
      body: 'Holla',
    },
    {
      authorID: 'rere434sdsd',
      body: 'How are you doing?',
    },
  ] as Message[]);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log(`clientid ${participants[0]}`);
    console.log(`therapistid ${therapistID}`);
    const subscription = API
      .graphql(graphqlOperation(subscriptions.onCreateMessage, {
        owner: therapistID,
        clientID: participants[0],
        therapistID,
      })) // @ts-ignore
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

    type MessageData = { data: { messagesByChannelID: { items: Message[] } } };

    // setMessages(messageData?.data?.messagesByChannelID?.items); // TODO uncomment this line
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
    <>
      <main className={styles.messageContainer}>
        <MessageHeader {...chatInfo} />
        <div className={styles.messages}>
          {messages.map((message) => (
            <p
              key={message.id}
              className={[
                styles.messageBubble,
                message.authorID === therapistID ? styles.me : '']
                .join(' ')}>{message.body}</p>
          ))}
        </div>
        <div className={styles.chatBar}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Type something..."
              onChange={handleChange}
              value={messageBody}
            />
          </form>
        </div>
      </main>
      <aside className={styles.notesContainer}>
        <div className={styles.note}>Make Notes</div>
        <div className={styles.chatBar}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Type something..."
              onChange={handleChange}
              value={messageBody}
            />
          </form>
        </div>
      </aside>
    </>
  );
};

type MessageHeaderProps = {
  firstName: string;
  lastName: string;
  color: string;
};

const MessageHeader = ({
  firstName,
  lastName,
  color,
}: MessageHeaderProps) => (
  <div className={styles.messageHeader}>
    <span style={{ backgroundColor: color }} className={styles.avatarBubble}>
      {`${firstName[0]}${lastName[0]}`}
    </span>
    <p className={styles.regularBoldText}>{`${firstName} ${lastName}`}</p>
  </div>
);

export default ChatMessage;

export type ChatProps = {
  channelID: string;
  participants: Array<string>;
  therapistID: string;
  chatInfo: {
    id: string;
    firstName: string;
    lastName: string;
    message: string;
    color: string;
  }
};
