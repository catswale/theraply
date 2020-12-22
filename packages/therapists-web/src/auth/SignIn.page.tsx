import React from 'react'
import { Auth } from 'aws-amplify';
import './SignIn.css'
import { useHistory } from "react-router-dom";

export const SignIn = () => {
  let history = useHistory();

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    await signIn(data.get('email') as string, data.get('password') as string)
    history.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In </h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" />
      </div>

      <button >SIGN IN</button>
      <button onClick={() => history.push('signup')}>SIGN UP</button>
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

async function signIn(email?: string, password?: string) {
  try {
      if (!email || !password) return
      const user = await Auth.signIn(email, password);
      console.log(user)
  } catch (error) {
      console.log('error signing in', error);
  }
}