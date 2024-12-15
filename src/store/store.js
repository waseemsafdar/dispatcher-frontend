import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import partnersReducers from './partnerSlice';
import locationsReducers from './locationsSlice';
import loadReducer from './loadSlice';




export const store = configureStore({
  reducer: {
    auth: authReducer,
    partners: partnersReducers,
    locations: locationsReducers,
    load: loadReducer,

  },
});
