// src/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import insulatorReducer from "./slices/insulatorSlice"; // если оставляешь корзину

const rootReducer = combineReducers({
  filters: filterReducer,
  insulators: insulatorReducer, // опционально
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;