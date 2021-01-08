import { createSlice } from '@reduxjs/toolkit';

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;

export const selectBookings = state => state.bookings.bookings;

export default bookingsSlice.reducer;
