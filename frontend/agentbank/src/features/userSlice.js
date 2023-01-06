import { createSlice } from "@reduxjs/toolkit";

// initialize data from local storage
const userFirstName = localStorage.getItem("userFirstName")
  ? localStorage.getItem("userFirstName")
  : null;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { firstName: userFirstName },
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    updateUser: (state, { payload }) => {
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
    },
    getUserAccounts: (state, { payload }) => {
      state.user.accounts = payload;
    },
  },
});

export const { setUserData, updateUser, getUserAccounts } = userSlice.actions;
export default userSlice.reducer;
