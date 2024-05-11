import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../application.properties";
import axios from "axios";

const initialState = {
  message: null,
  events: [],
  isloading: false,
};

export const fetchEventByTeamId = createAsyncThunk(
  'events/fetchEventByTeamId',
  async ({ team_id }, { getState }) => {
    try {
      const { token } = getState().auth; // Obtenha o token de autenticação do estado
      const response = await axios.get(`${API_URL}events/${team_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Defina o cabeçalho de autorização com o token
        },
      });
      return response.data;
    } catch (error) {
      //console.error('Erro:', error);

    }
  }
);


const findEventsByTeamSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    /*
    setEvents: (state, action) => {
      state.events = action.payload; // Define os novos eventos no estado
    },
    */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventByTeamId.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        fetchEventByTeamId.fulfilled,
        (state, { payload: { message, events } }) => {
          state.isloading = false;
          if (message) {
            state.message = message;
            state.events = events;
            //console.warn(state.message);
          } else {
            state.events = events;
            //console.warn("sucesso!");
          }
        }
      )
      .addCase(fetchEventByTeamId.rejected, (state) => {
        //console.error("Erro na ação fetchStudentByTeamIdAndTelefone:", action.error);
        state.isloading = true;
      });
  },
});


export const searchEventByTeamId = createAsyncThunk(
  "eventsSearch/searchEventByTeamId",
  async ({ team_id, searchValue = null }, { getState }) => {
    try {
      const { token } = getState().auth; // Obter o token do estado do Redux
      const response = await axios.get(`${API_URL}events/search/${team_id}/${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adicionar o token ao cabeçalho de autorização
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }
);



const findEventsBySearchSlice = createSlice({
  name: "eventsSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEventByTeamId.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        searchEventByTeamId.fulfilled,
        (state, { payload: { message, events } }) => {
          state.isloading = false;
          if (message) {
            state.message = message;
            state.events = events;
            // console.warn(state.message);
          } else {
            state.events = events;
            //console.warn("sucesso!");
          }
        }
      )
      .addCase(searchEventByTeamId.rejected, (state) => {
        //console.error("Erro na ação fetchStudentByTeamIdAndTelefone:", action.error);
        state.isloading = true;
      });
  },
});

export const findEventsByTeamReducer = findEventsByTeamSlice.reducer;
export const findEventsBySearchReducer = findEventsBySearchSlice.reducer;
//export const setEvents = findEventsByTeamReducer.actions;