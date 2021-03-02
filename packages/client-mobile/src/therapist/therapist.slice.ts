/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Therapist } from '@theraply/lib';

export const therapistSlice = createSlice({
  name: 'therapist',
  initialState: {
    therapists: [] as Therapist[],
  },
  reducers: {
    setTherapists: (state, action) => {
      state.therapists = action.payload;
    },
  },
});

export const { setTherapists } = therapistSlice.actions;

export default therapistSlice.reducer;
