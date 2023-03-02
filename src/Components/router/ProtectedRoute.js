import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({children,isAllowed}) => {

  if (!isAllowed) {
    console.log(isAllowed)
    return <Navigate to={'/login'}  />;
  }

  return children ? children : <Outlet />;
    
};



