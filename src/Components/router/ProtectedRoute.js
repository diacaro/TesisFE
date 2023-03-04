import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = ({
  isAllowed,
  redirectTo = '/login',
  children,
}) => {
  console.log(isAllowed)
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  } else{

  return children ? children : <Outlet />;
  }
};



// export const ProtectedRoute = (isAllowed,children) => {
//   if (!isAllowed) {
//     return <Navigate to="/login" />;
//   }

//   return children ? children : <Outlet />;
// };