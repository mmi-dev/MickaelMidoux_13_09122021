import { configureStore } from "@reduxjs/toolkit";
import homeFeaturesReducer from "../features/homeFeaturesSlice";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    homeFeatures: homeFeaturesReducer,
    user: userReducer,
    auth: authReducer,
  },
});
