import { createSlice } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {}, // cognitos authenticated user
    isSignedIn: false,
    loading: true,
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
  },
});

export const { setLoading, setIsSignedIn, setUser } = authSlice.actions;

export const selectIsSignedIn = (state) => state.auth.isSignedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
