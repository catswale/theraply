import { createSlice } from '@reduxjs/toolkit';
import {Auth} from 'aws-amplify'
import {Client} from '@theraply/lib';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    id: '' as string,
    client: {} as Client,
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setClient, setID } = clientSlice.actions;

export const selectClient = state => state.client.client;
// export const selectLoading = state => state.auth.loading;

export default clientSlice.reducer;
