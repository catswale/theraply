import React, { useEffect, useState } from 'react'
import {Auth} from 'aws-amplify'
import { useSelector, useDispatch } from 'react-redux';
import { setIsSignedIn, setLoading } from './auth.slice'

export const useAuth = () => {
  const {isSignedIn, loading} = useSelector(state => state.auth)
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

  return {
    loading,
    isSignedIn,
    setIsSignedIn: (value: boolean) => dispatch(setIsSignedIn(value))
  }
}