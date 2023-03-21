import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { stringToDate } from "../helpers";
import {
  handleAddNewEvent,
  handleDeleteEvent,
  handleEditEvent,
  handleLoadEvents,
  handleSetActiveEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( store => store.calendar);
  const { user } = useSelector( store => store.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const clearActiveEvent = () => {
    dispatch(handleSetActiveEvent(null))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if( calendarEvent.id ) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch( handleEditEvent({...calendarEvent, user}))
        return;
      }

      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(handleAddNewEvent({...calendarEvent, id: data.event.id, user}))
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error")
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(handleDeleteEvent());
    } catch ( error ) {
      console.log(error)
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    };
  };

  const startLoadingEvents = async () => {
    try {
      const {data} = await calendarApi.get("/events");
      const events = stringToDate( data.events );
      dispatch(handleLoadEvents(events))
    } catch (error) {
      console.log("error cargando eventos")
      console.log(error)
    }
  }

  return {
    // * Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // * Methods
    setActiveEvent,
    clearActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
