import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    entity: null,
    loading: false,
    isEditMode: true,
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    received: (state, actions) => {
      state.entity = actions.payload;
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
    updateIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
  },
});

export default accountSlice;
