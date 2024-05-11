// studentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_URL} from "../../../application.properties";
import axios from "axios";

const initialState = {
  message: null,
  student: null,
  isloading: false,
};

export const fetchCalenderTeamIdAndClass = createAsyncThunk(
  "calender/fetchCalenderTeamIdAndClass",
  async ({ team_id, class_id }) => {
    try {
      const response = await axios.get(`${API_URL}calender/${team_id}/${class_id}`);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }
);

const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalenderTeamIdAndClass.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        fetchCalenderTeamIdAndClass.fulfilled,
        (state, { payload: { message, calender } }) => {
          state.isloading = false;
          if (message) {
            state.message = message;
            state.calender = calender;
            //console.warn(state.message);
          } else {
            state.calender = calender;
            //console.warn("sucesso!");
          }
        }
      )
      .addCase(fetchCalenderTeamIdAndClass.rejected, (state) => {
        //console.error("Erro na ação fetchCalenderTeamIdAndClass:", action.error);
        state.isloading = true;
      });
  },
});

export default calenderSlice.reducer;

