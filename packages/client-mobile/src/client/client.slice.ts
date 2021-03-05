import { createSlice } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { Client, ClientTherapistRelationship } from '@theraply/lib';

export interface ClientState {
  client: Client,
}

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

export const selectClient = (state): Client => state.client.client;

export default clientSlice.reducer;
