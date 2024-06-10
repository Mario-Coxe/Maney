import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../application.properties";

const initialState = {
  message: null,
  user: null,
  token: "",
  isloading: false,
};

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios.post(API_URL + "login", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    //console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Credenciais incorretas.");
      console.log("dados: ", data);
    } else {
      console.error("Erro:", error);
    }
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(login.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(login.fulfilled, (state, { payload: { data, token } }) => {
        //state.isloading = false;
        state.user = data;
        state.token = token;
        //console.warn("sucesso!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = true;
      });
  },
});

export default authSlice.reducer;
