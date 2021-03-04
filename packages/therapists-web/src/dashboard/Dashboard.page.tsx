import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { queries, mutations, Therapist } from '@theraply/lib';
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { ClientCard } from './Client.card';
import Header from '../components/header';
import styles from './style.module.css';
import Home from '../components/home';
import { Chat } from '../chat/Chat.page';

export const Dashboard = () => {
  const [therapist, setTherapist] = useState({} as Therapist);
  const [activeNav, setActiveNav] = useState(1);
  const history = useHistory();
  useEffect(() => {
    fetchUserInfo();
    fetchUser();
  }, []);

  const signOut = async () => {
    try {
      console.log('signing out');
      await Auth.signOut();
      history.push('login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const fetchUserInfo = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    fetchTherapist(authUser);
  };

  async function fetchTherapist({ username, attributes }: any) {
    try {
      const data = await API.graphql(
        graphqlOperation(queries.getTherapist, { id: username })
      ) as TherapistData;
      type TherapistData = { data: { getTherapist: any } }
      const foundTherapist = data.data.getTherapist;
      console.log(foundTherapist);
      if (!foundTherapist) {
        console.log('therapist doesnt exist in db, creating.');
        await API.graphql(graphqlOperation(mutations.createTherapist, {
          input: {
            id: username,
            firstName: attributes.given_name,
            lastName: attributes.family_name,
            email: attributes.email,
          },
        }));

        fetchTherapist({ username, attributes });
      } else {
        console.log(foundTherapist);
        foundTherapist.clients = foundTherapist.clients.items.map((connection: any) => ({
          ...connection.client,
          channelID: connection.id,
        }));
        setTherapist(foundTherapist);
      }
    } catch (err) {
      console.log('error getting (user) therapist');
      console.log(err);
    }
  }

  async function fetchUser() {
    // const data = await API.graphql(
    //  graphqlOperation(queries.getClient, {id: '40bec478-66b7-44d2-b327-5fa6fbe42de4'})) as any
    // console.log(data)
  }

  return (
    <>
      <Header />
      <SideNav active={activeNav} onNavClick={(nav: number) => setActiveNav(nav)} />
      <main className={styles.main__container__wrapper}>
        <Switch>
          <Route exact path="/"
            render={() => (
              <Redirect to="/dashboard" />
            )}
          />
          <Route path="/dashboard" component={Home} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </main>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <h2>Hello {therapist.firstName}</h2>
        <h3>Your Clients</h3>
        {
          therapist?.clients?.map((client) => (
            <ClientCard key={client.channelID} client={client} therapist={therapist}/>
          ))
        }
        <button onClick={signOut}>SIGN OUT</button>
      </div> */}
    </>
  );
};

type SideNavProps = {
  active: number;
  // eslint-disable-next-line no-unused-vars
  onNavClick: (x: number) => void;
}

const SideNav = ({ active, onNavClick }: SideNavProps) => (
  <aside className={styles.side__nav__container}>
    <nav className={styles.side__nav}>
      <ul>
        <li className={active === 1 ? styles.side__nav__active : ''}>
          <NavLink
            to="/dashboard"
            className="regular__button"
            onClick={() => onNavClick(1)}
          >
            <span className={styles.dashboard__icon}></span> Dashboard
          </NavLink>
        </li>
        <li className={active === 2 ? styles.side__nav__active : ''}>
          <NavLink
            to="/chat"
            className="regular__button"
            onClick={() => onNavClick(2)}
          >
            <span className={styles.chat__icon}></span> Chats
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);
