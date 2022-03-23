import React from "react";
import { Navigate} from "react-router-dom";


const PrivateRoutes = ({ children, isAuthenticated}) => {
  

  return isAuthenticated ? children : <Navigate to="/login"/>
};

export default PrivateRoutes;
