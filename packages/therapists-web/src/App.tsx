import React, {useEffect} from 'react'
import Amplify, {Auth} from 'aws-amplify'
import '@aws-amplify/pubsub';
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
import {Chat} from './chat/Chat.page'
Amplify.configure(awsExports);
const App = () => {
  useEffect(() => {
    getAuth()
  })
  async function getAuth() {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user)
  }
  return <Chat/>
}

export default App