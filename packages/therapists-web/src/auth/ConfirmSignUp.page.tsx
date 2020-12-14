import React from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {mutations} from '@theraply/lib';
import './SignUp.css'

export const ConfirmSignUp = (props: any) => {
  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    confirmSignUp(data.get('email') as string, data.get('code') as string)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Confirm Sign Up</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required/>
      </div>
      <div>
        <label>Code</label>
        <input type="text" id="code" name="code" required/>
      </div>

      <button>CONFIRM</button>
    </form>
  )
}

async function confirmSignUp(email: string, code: string) {
  try {
    const result = await Auth.confirmSignUp(email, code);
    console.log(result)
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}
