import React, { useEffect, useState } from 'react'
import {Auth} from 'aws-amplify'
import { useSelector, useDispatch } from 'react-redux';
import { setIsSignedIn, setLoading, setUser } from './auth.slice'
import {CognitoUser} from '@aws-amplify/auth'

export const useAuth = () => {
  const {isSignedIn, loading, user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  console.log('usser')
  console.log(user)
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
    const user = await Auth.currentAuthenticatedUser();
    dispatch(setUser(user))
  }

  return {
    user,
    loading,
    isSignedIn,
    setIsSignedIn: (value: boolean) => dispatch(setIsSignedIn(value)),
    fetchCurrentAuthUser,
    setUser: ({attributes, username}) => dispatch(setUser({attributes, username})),
  }
}