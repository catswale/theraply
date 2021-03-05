import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: {},
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const {
  setChats,
} = chatSlice.actions;

export const selectChats = (state) => state.auth.chats;

export default chatSlice.reducer;
