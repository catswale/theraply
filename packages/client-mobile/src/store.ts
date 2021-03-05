import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import bookingsSlice from './bookings/bookings.slice';
import clientSlice from './client/client.slice';
import therapistsSlice from './therapists/therapists.slice';
import chatSlice from './chat/chat.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
    client: clientSlice,
    therapists: therapistsSlice,
    bookings: bookingsSlice,
    chat: chatSlice,
  },
});
