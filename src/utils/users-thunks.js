import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadSingleUser, login, register, deleteUser } from "./users-service";

export const registerThunk = createAsyncThunk(
  "register",
  async (user) => await register(user)
);

export const loginThunk = createAsyncThunk(
  "login",
  async (user) => await login(user)
);

export const loadSingleUserThunk = createAsyncThunk(
  "loadSingleUser",
  async (username) => await loadSingleUser(username)
);

export const deleteUserThunk = createAsyncThunk(
  "deleteUser",
  async (uid) => await deleteUser(uid)
);
