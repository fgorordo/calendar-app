import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños",
  notes: "Hay que comprar la torta",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Fernando",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    // events: [],
    activeEvent: null,
  },
  reducers: {
    handleSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    handleAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    handleEditEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    handleDeleteEvent: ( state ) => {
      if( state.activeEvent ) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      };
    }
  },
});

//Action creators are generated for each case reducer function
export const { handleSetActiveEvent, handleAddNewEvent, handleEditEvent, handleDeleteEvent } =
  calendarSlice.actions;
