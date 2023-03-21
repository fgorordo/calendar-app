import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView] = useState(localStorage.getItem('lastView') || "week");
  const {openDateModal} = useUiStore()
  const { user } = useAuthStore()

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: '0px',
      opacity: 0.8,
      color: "white"
    }
    return {
      style
    }
  }

  const handleDoubleClick = (event) => {
    openDateModal();
  };

  const handleSelect = (event) => {
    setActiveEvent(event);
  };

  const handleViewChange = (event) => {
    localStorage.setItem('lastView', event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleSelect}
        onView={handleViewChange}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
