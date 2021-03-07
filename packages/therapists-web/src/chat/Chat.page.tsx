import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Switch, Route, NavLink } from 'react-router-dom';
import '@aws-amplify/pubsub';
import ChatMessage, { ChatProps } from './Chat.message.page';
import styles from './style.module.css';

const chats = [
  {
    channelID: '434ssdsd',
    participants: ['434sdsdsdsd', 'rere343sdsd'],
    therapistID: 'rere434sdsd',
    chatInfo: {
      id: '1',
      firstName: 'Annette',
      lastName: 'Black',
      message: 'Hello Jane, how may I help you?',
      color: '#E0F7FF',
    },
  },
  {
    channelID: '434ssdsd',
    participants: ['434sdsdsdsd', 'rere343sdsd'],
    therapistID: 'rere434sdsd',
    chatInfo: {
      id: '2',
      firstName: 'Darell',
      lastName: 'Steward',
      message: 'Hello Jane, how may I help you?',
      color: '#F2F07C',
    },
  },
  {
    channelID: '434ssdsd',
    participants: ['434sdsdsdsd', 'rere343sdsd'],
    therapistID: 'rere434sdsd',
    chatInfo: {
      id: '3',
      firstName: 'Ronald',
      lastName: 'Richards',
      message: 'Hello Jane, how may I help you?',
      color: '#56CCF2',
    },
  },
];

export const Chat = () => {
  const [therapistID, setTherapistID] = React.useState({});

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const { username } = await Auth.currentAuthenticatedUser();
    setTherapistID(username);
  };

  return (
    <main className={styles.mainContainerWrapper}>
      <aside className={styles.chatPreviewsWrapper}>
        {
          chats.map((chat) => (<ChatPreview {...chat} />))
        }
      </aside>
      <section className={styles.mainContainer}>
        <Switch>
          <Route path="/chat/:chatId" component={ChatMessage} />
        </Switch>
      </section>
    </main>
  );
};

const ChatPreview = (props: ChatProps) => {
  const {
    id,
    firstName,
    lastName,
    message,
    color,
  } = props.chatInfo;

  return (
    <NavLink
      to={{ pathname: `/chat/${id}`, state: props }}
      activeClassName={styles.activeChatPreview}
      className={['regularButton', styles.chatPreviewContainer].join(' ')}
    >
      <span style={{ backgroundColor: color }} className={styles.avatarBubbleLarge}>
        {`${firstName[0]}${lastName[0]}`}
      </span>
      <div className={styles.chatPreview}>
        <p className={styles.regularBoldText}>{`${firstName} ${lastName}`}</p>
        <span className={styles.lightText}>{message}</span>
      </div>
    </NavLink>
  );
};
