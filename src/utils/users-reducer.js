import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, loadSingleUserThunk } from "./users-thunks";

const usersReducer = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    currentUser: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.loading = false;
      state.users = [];
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: {
    [loadSingleUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [loginThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [registerThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
  },
});
export const { logout } = usersReducer.actions;
export default usersReducer.reducer;
