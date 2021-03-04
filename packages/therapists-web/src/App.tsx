import React, { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Provider } from 'react-redux';
import store from '@theraply/client-mobile/src/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import awsExports from './aws-exports';
import { Chat } from './chat/Chat.page';
import { Dashboard } from './dashboard/Dashboard.page';
import { SignIn } from './auth/SignIn.page';
import { SignUp } from './auth/SignUp.page';
import { ConfirmSignUp } from './auth/SignUpConfirm.page';
import { ProtectedRoute } from './auth/ProtectedRoute';

Amplify.configure(awsExports);

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signup-confirm" component={ConfirmSignUp} />
      <ProtectedRoute path="/chat" component={Chat} />
      <ProtectedRoute path="/" component={Dashboard}/>
    </Switch>
  </Router>
);

const AppWrapper = () => (
    <Provider store={store}>
      <App/>
    </Provider>
);

export default AppWrapper;
