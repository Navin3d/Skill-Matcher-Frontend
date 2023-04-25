import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    loading: false,
    user: {
      entity: null,
      loading: false,
    },
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    received: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
    searchRequested: (state) => {
      state.loading = true;
    },
    searchReceived: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    searchFailed: (state) => {
      state.loading = false;
    },
    userRequested: (state) => {
      state.user.loading = true;
    },
    userReceived: (state, action) => {
      state.user.entity = action.payload;
      state.user.loading = false;
    },
    userFailed: (state) => {
      state.user.loading = false;
    },
  },
});

export default usersSlice;
