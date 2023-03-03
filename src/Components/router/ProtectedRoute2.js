import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { AppContext } from "../../Context/AppContext";
import useAuth from "../../hooks/useAuth";
import AppLayout from "../../Components/layout/AppLayout";


export const ProtectedRoute = (isAllowed) => {
    const { auth } = React.useContext(AppContext);

  if(!isAllowed) 
  return (
      <>
          {auth ? 
          (
                  <div className="bg-gray-100">
                      <AppLayout />

                      <main className='p-10 flex-1 '>
                       <Outlet />
                      </main>
                  </div>
          ) : <Navigate to="/dashboard" />}
      </>
  )
};





