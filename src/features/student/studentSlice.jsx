// studentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_URL} from "../../../application.properties";
import axios from "axios";

const initialState = {
  message: null,
  student: null,
  isloading: false,
};

export const fetchStudentByTeamIdAndTelefone = createAsyncThunk(
  "student/fetchByTeamIdAndTelefone",
  async ({ team_id, phone_number }) => {
    try {
      const response = await axios.get(`${API_URL}students/${team_id}/${phone_number}`);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentByTeamIdAndTelefone.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        fetchStudentByTeamIdAndTelefone.fulfilled,
        (state, { payload: { message, student } }) => {
          state.isloading = false;
          if (message) {
            state.message = message;
            state.student = student;
            //console.warn(state.message);
          } else {
            state.student = student;
            //console.warn("sucesso!");
          }
        }
      )
      .addCase(fetchStudentByTeamIdAndTelefone.rejected, (state) => {
        //console.error("Erro na ação fetchStudentByTeamIdAndTelefone:", action.error);
        state.isloading = true;
      });
  },
});

export default studentSlice.reducer;

