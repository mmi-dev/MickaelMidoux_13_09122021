import { createSlice } from "@reduxjs/toolkit";

export const homeFeaturesSlice = createSlice({
  name: "homeFeatures",
  initialState: {
    homeFeatures: null,
  },
  reducers: {
    setHomeFeaturesData: (state, { payload }) => {
      state.homeFeatures = payload;
    },
  },
});

export const { setHomeFeaturesData } = homeFeaturesSlice.actions;
export default homeFeaturesSlice.reducer;
