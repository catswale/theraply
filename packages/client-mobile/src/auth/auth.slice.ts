import { createSlice } from '@reduxjs/toolkit';
import {Auth} from 'aws-amplify'

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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const fetchIsSignedIn = dispatch => {
//   try {
//     await Auth.currentAuthenticatedUser();
//     setIsSignedIn(true)
//   } catch (err) {
//     setIsSignedIn(false)
//   }
// };

export const selectIsSignedIn = state => state.auth.isSignedIn;
export const selectLoading = state => state.auth.loading;
export const selectUser = state => state.auth.user;

export default authSlice.reducer;
