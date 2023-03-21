import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
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
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    handleDeleteEvent: ( state ) => {
      if( state.activeEvent ) {
        state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      };
    },
    handleLoadEvents: (state, {payload = []}) => {
      payload.forEach( event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id);
        if ( !exists ) {
          state.events.push(event);
        };
      });
      state.isLoadingEvents = false;
    }
  },
  onLogoutCalendar: ( state ) => {
    state.isLoadingEvents = true,
    state.events = [],
    state.activeEvent = null
  }
});

//Action creators are generated for each case reducer function
export const { 
  handleSetActiveEvent, 
  handleAddNewEvent, 
  handleEditEvent, 
  handleDeleteEvent, 
  handleLoadEvents,
  onLogoutCalendar, 
} = calendarSlice.actions;
