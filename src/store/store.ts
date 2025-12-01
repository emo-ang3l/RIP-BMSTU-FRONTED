import { configureStore } from '@reduxjs/toolkit';
import unitsReducer from './slices/unitsSlice';
import filterReducer from './slices/unitsSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    units: unitsReducer,
    filters: filterReducer,
    auth: authReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;