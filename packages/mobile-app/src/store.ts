import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import clientSlice from './client/client.slice';
export default configureStore({
  reducer: {
    auth: authSlice,
    client: clientSlice,
  },
});

export type State = {
  auth: typeof authSlice
}
