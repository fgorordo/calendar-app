import { useDispatch, useSelector } from "react-redux";
import { handleAddNewEvent, handleDeleteEvent, handleEditEvent, handleSetActiveEvent } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((store) => store.calendar);
  const dispatch = useDispatch();
  
  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async( calendarEvent ) => {
    //TODO: Llegar al backend

    // Todo bien
    if(calendarEvent._id) {
      dispatch(handleEditEvent( {...calendarEvent} ));
    } else {
      //Creando
      dispatch( handleAddNewEvent({...calendarEvent, _id: new Date().getTime() }));
    }
  }

  const startDeletingEvent = async () => {
    dispatch( handleDeleteEvent());
  }

  return {
    // * Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // * Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
