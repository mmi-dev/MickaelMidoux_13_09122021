import { configureStore } from "@reduxjs/toolkit";
import homeFeaturesReducer from "../features/homeFeaturesSlice";

export const store = configureStore({
  reducer: {
    homeFeatures: homeFeaturesReducer,
  },
});
