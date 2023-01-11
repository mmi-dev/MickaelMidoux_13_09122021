import { createSlice } from "@reduxjs/toolkit";
import useStorage from "../hooks/useStorage";

const storage = useStorage();

// initialize data from local storage
const userToken = storage.get("userToken", true)
  ? storage.get("userToken", true)
  : storage.get("userToken", false)
  ? storage.get("userToken", false)
  : "";
const authenticated = storage.get("isAuthenticated", true)
  ? storage.get("isAuthenticated", true)
  : storage.get("isAuthenticated", false)
  ? storage.get("isAuthenticated", false)
  : false;
const persist = storage.get("rememberMe", true)
  ? storage.get("rememberMe", true)
  : storage.get("rememberMe", false)
  ? storage.get("rememberMe", false)
  : false;
const loginData = {
  email: storage.get("userLogin", true)
    ? storage.get("userLogin", true)
    : storage.get("userLogin", false)
    ? storage.get("userLogin", false)
    : "",
  password: storage.get("userPwd", true)
    ? storage.get("userPwd", true)
    : storage.get("userPwd", false)
    ? storage.get("userPwd", false)
    : "",
};

const initialState = {
  loginData,
  userToken,
  authenticated,
  persist,
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
