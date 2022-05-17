import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Successfull!");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload })); //Store everything in local storage by name profile
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default authslice.reducer;
