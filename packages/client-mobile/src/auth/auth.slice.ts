import { createSlice } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { CognitoIdToken } from 'amazon-cognito-identity-js';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {}, // cognitos authenticated user
    isSignedIn: false,
    loading: true,
    idToken: undefined as CognitoIdToken | undefined,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIDToken: (state, action) => {
      state.idToken = action.payload;
    },
  },
});

export const {
  setLoading, setIsSignedIn, setUser, setIDToken,
} = authSlice.actions;

export const selectIsSignedIn = (state) => state.auth.isSignedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export const selectBearerToken = (state) => state.auth.bearerToken;

export default authSlice.reducer;
