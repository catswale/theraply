import React from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {mutations, subscriptions, queries} from '@theraply/lib';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  ICognitoUserAttributeData,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import './SignIn.css'

export const SignIn = () => {

  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    signIn(data.get('email') as string, data.get('password') as string)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" />
      </div>

      <button>SIGN IN</button>
      <button onClick={getAuth}>GET AUTH</button>
    </form>
  )
}

async function getAuth() {
  try {
    const user = await Auth.currentUserCredentials();
    console.log(user)
  } catch (err) {
    console.log(typeof err)
    console.log(err)
  }
}

async function signOut() {
  try {
    console.log('signing out')
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

async function signIn(email?: string, password?: string) {
  try {
      if (!email || !password) return
      const user = await Auth.signIn(email, password);
      console.log(user)
  } catch (error) {
      console.log('error signing in', error);
  }
}