import React from "react";
import { Navigate, Route } from "react-router-dom";

const PublicRoutes = ({ children, isAuthenticated}) => {
  

  return isAuthenticated ? <Navigate to="/"/>: children 
};

export default PublicRoutes;
