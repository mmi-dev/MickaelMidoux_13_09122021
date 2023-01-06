import { createSlice } from "@reduxjs/toolkit";

// initialize data from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const authenticated = localStorage.getItem("isAuthenticated")
  ? localStorage.getItem("isAuthenticated")
  : false;
const loginData = {
  email: localStorage.getItem("userLogin")
    ? localStorage.getItem("userLogin")
    : null,
  password: localStorage.getItem("userPwd")
    ? localStorage.getItem("userPwd")
    : null,
};

const initialState = {
  loginData,
  userToken,
  authenticated,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.loginData = {
        email: payload.email,
        password: payload.password,
      };
      state.userToken = payload.accessToken;
      state.authenticated = true;
    },
    logout: (state, { payload }) => {
      state.loginData = {};
      state.userToken = null;
      state.authenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
