import { createSlice } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { Client, ClientTherapistRelationship } from '@theraply/lib';

export interface ClientState {
  client: Client,
  relationships: ClientTherapistRelationship[],
}

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: {} as Client,
    relationships: [] as ClientTherapistRelationship[],
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setRelationships: (state, action) => {
      state.relationships = action.payload;
    },
  },
});

export const { setClient } = clientSlice.actions;
export const { setRelationships } = clientSlice.actions;

export const selectClient = (state): Client => state.client.client;
export const selectRelationships = (state): ClientTherapistRelationship => state.client.relationships;
// export const selectLoading = state => state.auth.loading;

export default clientSlice.reducer;
