import React, {useEffect, useState} from 'react'
import Amplify, {Auth} from 'aws-amplify'
import awsExports from "./aws-exports";
import { Provider } from 'react-redux';
import store from './store'
import {Chat} from './chat/Chat.page'
import {Dashboard} from './dashboard/Dashboard.page'
import {SignIn} from './auth/SignIn.page'
import {SignUp} from './auth/SignUp.page'
import {ConfirmSignUp} from './auth/SignUpConfirm.page'
import { ProtectedRoute } from './auth/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

Amplify.configure(awsExports);

const App = () => {
  return (
  <Router>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signup-confirm" component={ConfirmSignUp} />
      <Route exact path="/"
        render={() => {
            return (
              <Redirect to="/dashboard" />
            )
        }}
      />
      <ProtectedRoute path="/dashboard" component={Dashboard}/>
      <ProtectedRoute path="/chat" component={Chat} />
    </Switch>
  </Router>
  )
}

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper