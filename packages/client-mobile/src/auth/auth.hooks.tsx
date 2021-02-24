import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import {
  setIsSignedIn, setLoading, setUser, setIDToken,
} from './auth.slice';

export const useAuth = () => {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchIsSignedIn();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.log('error signing in', error);
      throw error;
    }
  };

  async function signUp(firstName: string, email: string, password: string) {
    try {
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          email,
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log('error signing up:', error);
      throw error;
    }
  }

  async function fetchIsSignedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      dispatch(setIsSignedIn(true));
    } catch (err) {
      dispatch(setIsSignedIn(false));
    }
    dispatch(setLoading(false));
  }

  async function fetchCurrentAuthUser() {
    const { attributes, username } = await Auth.currentAuthenticatedUser();
    dispatch(setUser({ attributes, id: username }));
  }

  async function signOut() {
    try {
      console.log('signing out');
      await Auth.signOut();
      dispatch(setIsSignedIn(false));
      dispatch(setUser({}));
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function resendConfirmationCode(username: string) {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
      throw err;
    }
  }

  return {
    user: selector.user,
    loading: selector.loading,
    isSignedIn: selector.isSignedIn,
    setIsSignedIn: (value: boolean) => dispatch(setIsSignedIn(value)),
    fetchCurrentAuthUser,
    setUser: ({ attributes, username }) => dispatch(setUser({ attributes, id: username })),
    signIn,
    signUp,
    signOut,
    resendConfirmationCode: (username: string) => resendConfirmationCode(username),
  };
};
