import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { queries, mutations, Therapist } from '@theraply/lib';
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { ClientCard } from './Client.card';
import Header from '../components/header';
import styles from './style.module.css';
import Home from '../components/home';
import { Chat } from '../chat/Chat.page';

export const Dashboard = () => {
  const [therapist, setTherapist] = useState({} as Therapist);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchUserInfo();
    fetchUser();
  }, []);

  const isActiveNav = (nav: string) => () => (
    location.pathname.split('/')[1] === nav
  );

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
        graphqlOperation(queries.getTherapist, { id: username }),
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
      <section className={styles.wrapper}>
        <SideNav isActiveNav={isActiveNav} />
        <Switch>
          <Route exact path="/"
            render={() => (
              <Redirect to="/dashboard" />
            )}
          />
          <Route path="/dashboard" component={Home} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </section>
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
  // eslint-disable-next-line no-unused-vars
  isActiveNav: (nav: string) => () => boolean;
}

const SideNav = ({ isActiveNav }: SideNavProps) => (
  <aside className={styles.sideNavContainer}>
    <nav className={styles.sideNav}>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className="regularButton"
            activeClassName={styles.sideNavActive}
            isActive={isActiveNav('dashboard')}
          >
            <span className={styles.dashboardIcon}></span> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
            className="regularButton"
            activeClassName={styles.sideNavActive}
            isActive={isActiveNav('chat')}
          >
            <span className={styles.chatIcon}></span> Chats
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);
