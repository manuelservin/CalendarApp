import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import CalendarScreen from "../components/calendar/CalendarScreen";
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<CalendarScreen />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
