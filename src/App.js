import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Sidebar from "./Components/sidebar/Sidebar";
import GreenhousePage from "./Pages/greenhouse/GreenhousePage";
import "boxicons/css/boxicons.min.css";
import CustomerPage from "./Pages/customer/CustomerPage";
import ProductPage from "./Pages/product/ProductPage";
import DeskPage from "./Pages/desk/DeskPage";
import CategoryPage from "./Pages/category/CategoryPage";
import OrdenPage from "./Pages/orden/OrdenPage";
import UserPage from "./Pages/user/UserPage";
import AppLayout from "./Components/layout/AppLayout";
import Login from "./Pages/login/Login";
import { ProtectedRoute } from "./Components/router/ProtectedRoute";
import { AppContext, AppProvider } from "./Context/AppContext";
import DetallesPdf from "./Pages/detalles/DetallesPdf";
import { Dashboard } from "./Pages/dashboard/Dashboard";
import { getUser } from './Services/userService';
import jwt from 'jwt-decode';

function App() {
const { auth, setAuth } = React.useContext(AppContext);
const cokieActual = document.cookie.replace('token=','');  
console.log(!cokieActual)
useEffect(()=> {
if (!!cokieActual) 
    getUser(jwt(cokieActual).sub)
                    .then(respuser =>{                    
                    setAuth(respuser);
                   
                    }
                    )

  },[])


  return (
    <BrowserRouter>


      {(!auth.role)? (
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <div className="flex">
          <AppLayout>
            <Routes>
              <Route index element={<Dashboard/>} />
              <Route
                path="/products"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <ProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invernadero"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <GreenhousePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <CategoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mesa"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <DeskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <CustomerPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orden"
                element={
                  <ProtectedRoute
                    // redirectTo="/login"
                    isAllowed={!!(auth.role == "USER" || auth.role =="ADMIN" || auth.role =="SUPERADMIN")}
                  >
                    <OrdenPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pdf/:ordenId"
                element={
                  <ProtectedRoute
                    isAllowed={!!(auth.role == "USER" || auth.role == "ADMIN" ||auth.role == "SUPERADMIN")}
                  >
                    <DetallesPdf />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <ProtectedRoute
                    isAllowed={!!(auth.role == "SUPERADMIN")}
                  >
                    <UserPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
         </div>
      )}
    </BrowserRouter>
  );
}

export default App;
