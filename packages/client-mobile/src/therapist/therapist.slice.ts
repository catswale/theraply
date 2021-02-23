/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Therapist } from '@theraply/lib';

export const therapistSlice = createSlice({
  name: 'therapist',
  initialState: {
    therapists: [] as Therapist[],
    userTherapist: {} as Therapist,
  },
  reducers: {
    setTherapists: (state, action) => {
      state.therapists = action.payload;
    },
    pickTherapist: (state, action) => {
      state.userTherapist = action.payload;
    },
  },
});

export const { setTherapists, pickTherapist } = therapistSlice.actions;

export default therapistSlice.reducer;
