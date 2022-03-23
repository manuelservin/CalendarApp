import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { startChecking } from "../redux/actions/auth";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
const AppRouter = () => {
  const {checking,uid} = useSelector( state => state.auth);
  console.log(checking)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])


  
  return (
    <Routes>
      <Route exact path="/login" element={
        <PublicRoutes  isAuthenticated={!!uid} >
          <Login />
        </PublicRoutes>
    } 
      />

      <Route path="/" 
      element={
        <PrivateRoutes  isAuthenticated={!!uid}>
          <CalendarScreen />

        </PrivateRoutes>
      
      } />
      
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
