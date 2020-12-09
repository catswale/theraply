/* src/App.js */
import React from 'react'
import Amplify, {Auth} from 'aws-amplify'
import '@aws-amplify/pubsub';
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css'
import awsExports from "./aws-exports";
import {Chat} from 'chat/Chat.page'
Amplify.configure(awsExports);

const App = () => {
  
  return <Chat/>
}

export default withAuthenticator(App)