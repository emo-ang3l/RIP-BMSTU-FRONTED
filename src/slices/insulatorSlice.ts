// src/slices/insulatorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../store.ts";

// === Типы ===
export interface Insulator {
  id: number;
  insulator_name: string;
  insulator_description: string;
  Insulator_active: boolean;
  image_key: string | null;
  image_url: string | null;
  thermal_conductivity: number;
  price_per_m2: string;
  density: number;
  fire_rating: string;
}

interface InsulatorState {
  list: Insulator[];
  cartSum: number;
}

// === Начальное состояние ===
const initialState: InsulatorState = {
  list: [],
  cartSum: 0,
};

// === Слайс ===
const insulatorSlice = createSlice({
  name: "insulators",
  initialState,
  reducers: {
    setInsulators(state, action: PayloadAction<Insulator[]>) {
      state.list = action.payload;
    },
    addToCart(state, action: PayloadAction<number>) {
      state.cartSum += action.payload;
    },
    clearCart(state) {
      state.cartSum = 0;
    },
  },
});

// === Экспорт экшенов ===
export const {
  setInsulators: setInsulatorsAction,
  addToCart: addToCartAction,
  clearCart: clearCartAction,
} = insulatorSlice.actions;

// === Селекторы с типами ===
export const useInsulators = () =>
  useSelector((state: RootState) => state.insulators.list);

export const useCartSum = () =>
  useSelector((state: RootState) => state.insulators.cartSum);

// === Редьюсер ===
export default insulatorSlice.reducer;