import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { component: Component, ...rest } = props;

  useEffect(() => {
    fetchIsSignedIn();
  }, []);
  async function fetchIsSignedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      setIsSignedIn(true);
    } catch (err) {
      setIsSignedIn(false);
    }
    setLoading(false);
  }
  return (
    <Route
        {...rest}
        render={() => (isSignedIn ? (
                <Component {...props} />
        ) : loading ? (
                <div>LOADING...</div>
        ) : (
                <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: props.location },
                    }}
                />
        ))
        }
    />
  );
};
