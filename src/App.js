import React from "react";
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

function App() {
  const { auth, setAuth } = React.useContext(AppContext);
const roleActual =localStorage.getItem("access")
console.log('roleActual' + roleActual)
  return (
    <BrowserRouter>
      {(!auth.role)? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <div className="flex">
          <AppLayout>
            <Routes>
              <Route index element={<h1> Bienvenido </h1>} />
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
                path="/pdf"
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
