import React, {useEffect, useState} from 'react'
import Amplify, {Auth} from 'aws-amplify'
import '@aws-amplify/pubsub';
import awsExports from "./aws-exports";
import {Chat} from './chat/Chat.page'
import {Dashboard} from './dashboard/Dashboard.page'
import {SignIn} from './auth/SignIn.page'
import {SignUp} from './auth/SignUp.page'
import {ConfirmSignUp} from './auth/ConfirmSignUp.page'
import { ProtectedRoute } from './auth/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

Amplify.configure(awsExports);

const App = () => {
  return (
  <Router>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signup-confirm" component={ConfirmSignUp} />
      <ProtectedRoute path="/dashboard" component={Dashboard}/>
      <ProtectedRoute path="/chat" component={Chat} />
    </Switch>
  </Router>
  )
}




export default App