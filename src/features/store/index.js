import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authentication/authSlice"
import studentReducer from "../student/studentSlice";
import { findEventsByTeamReducer, findEventsBySearchReducer } from "../event/eventSlice";
import calenderReducer from "../calender/calenderSlice";
import horarioReducer from "../horario/horarioSlice";
export const Store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    events: findEventsByTeamReducer,
    eventsSearch: findEventsBySearchReducer,
    calender: calenderReducer,
    schedule: horarioReducer,
  },
});
