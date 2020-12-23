import { createSlice } from '@reduxjs/toolkit';
import {Auth} from 'aws-amplify'
import {Client} from '@theraply/lib';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: {} as Client,
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setClient } = clientSlice.actions;

export const selectClient = state => state.client.client;
// export const selectLoading = state => state.auth.loading;

export default clientSlice.reducer;
