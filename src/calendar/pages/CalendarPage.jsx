import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from "../../helpers";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView] = useState(localStorage.getItem('lastView') || "week");
  const {openDateModal} = useUiStore()

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: "#347CF7",
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
    console.log({click: event})
    setActiveEvent(event);
  };

  const handleViewChange = (event) => {
    localStorage.setItem('lastView', event);
  };

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
