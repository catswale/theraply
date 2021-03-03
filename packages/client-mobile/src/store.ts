import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import bookingsSlice from './bookings/bookings.slice';
import clientSlice from './client/client.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
    client: clientSlice,
    bookings: bookingsSlice,
  },
});
