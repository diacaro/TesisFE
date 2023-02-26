import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  
  let isLogged = localStorage.getItem("acces")
  
  if (!isLogged) {
    return <Navigate to="/login"  />;
  }

  
  return ( <Outlet />
  )
};
