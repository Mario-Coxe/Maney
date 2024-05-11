
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_URL} from "../../../application.properties";
import axios from "axios";

const initialState = {
  message: null,
  schedules: [],
  isloading: false,
};

export const fetchHorarioTeamIdAndClass = createAsyncThunk(
  "schedule/fetchHorarioTeamIdAndClass",
  async ({ team_id, class_id }) => {
    try {
      const response = await axios.get(`${API_URL}horarios/${team_id}/${class_id}`);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }
);

const horarioSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHorarioTeamIdAndClass.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        fetchHorarioTeamIdAndClass.fulfilled,
        (state, { payload: { message, schedules } }) => {
          state.isloading = false;
          if (message) {
            state.message = message;
            state.schedule = schedules;
            //console.warn(state.message);
          } else {
            state.schedule = schedules;
            //console.warn("sucesso!");
          }
        }
      )
      .addCase(fetchHorarioTeamIdAndClass.rejected, (state) => {
        //console.error("Erro na ação fetchHorarioTeamIdAndClass:", action.error);
        state.isloading = true;
      });
  },
});

export default horarioSlice.reducer;

