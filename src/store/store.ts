import { configureStore } from '@reduxjs/toolkit';
import unitsReducer from './slices/unitsSlice';     // старый (оставляем)
import filterReducer from "./slices/unitsSlice.ts";   // ← ДОБАВЛЯЕМ НОВЫЙ

export const store = configureStore({
  reducer: {
    units: unitsReducer,      // ← оставляем как было
    filters: filterReducer,   // ← ДОБАВЛЯЕМ ФИЛЬТРЫ
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;