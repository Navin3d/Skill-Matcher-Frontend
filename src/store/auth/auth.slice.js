import { createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "../../services";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorageService.getAccessToken() || null,
    role: null,
  },
  reducers: {
    succeed: (state) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
