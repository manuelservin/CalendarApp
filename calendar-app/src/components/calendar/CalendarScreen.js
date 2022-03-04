import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../ui/Navbar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/actions/ui";
import { eventSetActive } from "../../redux/actions/events";
import AddNewFab from "../ui/AddNewFab";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
  {
    title: "Cumpleaños de la doña",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "manuel",
    },
  },
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    console.log(e);
    dispatch(openModal());
  };

  const onSelectEvent = (e) => {
    console.log(e);
    dispatch(eventSetActive(e));
    dispatch(openModal());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0",
      opacity: 0.8,
      display: "block",
      color: "#fff",
    };
    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
