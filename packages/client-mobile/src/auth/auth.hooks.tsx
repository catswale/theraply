import React, { useEffect } from 'react'
import {Auth} from 'aws-amplify'
import { useSelector, useDispatch } from 'react-redux';
import { setIsSignedIn, setLoading, setUser } from './auth.slice'

export const useAuth = () => {
  const {isSignedIn, loading, user} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    fetchIsSignedIn()
  }, [])
  
  async function fetchIsSignedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      dispatch(setIsSignedIn(true))
    } catch (err) {
      dispatch(setIsSignedIn(false))
    }
    dispatch(setLoading(false))
  }

  async function fetchCurrentAuthUser() {
    const {attributes, username} = await Auth.currentAuthenticatedUser();
    dispatch(setUser({attributes, username}))
  }

  async function signOut() {
    try {
      console.log('signing out')
      await Auth.signOut();
      dispatch(setIsSignedIn(false))
      dispatch(setUser({}))
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return {
    user,
    loading,
    isSignedIn,
    setIsSignedIn: (value: boolean) => dispatch(setIsSignedIn(value)),
    fetchCurrentAuthUser,
    setUser: ({attributes, username}) => dispatch(setUser({attributes, username})),
    signOut,
  }
}