import { configureStore } from '@reduxjs/toolkit';
import shipmentsReducer from './Slices/shipmentsSlice';
import recipientsSlice from './Slices/recipientsSlice';
import clientsSlice from './Slices/clientsSlice';
import driversSlice from './Slices/driversSlice';
import citiesSlice from './Slices/citiesSlice';
import usersSlice from './Slices/usersSlice';

export const store = configureStore({
  reducer: {
    shipments: shipmentsReducer,
    recipients: recipientsSlice,
    clients: clientsSlice,
    drivers: driversSlice,
    users: usersSlice,
    cities: citiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
