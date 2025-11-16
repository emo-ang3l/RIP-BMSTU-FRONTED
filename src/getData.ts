// src/getData.ts
import { useEffect } from "react";
import { fetchInsulators } from "./api/api";
import { setInsulatorsAction } from "./slices/insulatorSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { useFilters } from "./slices/filterSlice";

export function GetInsulatorsData() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useFilters();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchInsulators(
          filters.search,
          filters.minPrice ? Number(filters.minPrice) : undefined,
          filters.maxPrice ? Number(filters.maxPrice) : undefined
        );
        dispatch(setInsulatorsAction(data));
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
    fetchData();
  }, [dispatch, filters.search, filters.minPrice, filters.maxPrice]);
}