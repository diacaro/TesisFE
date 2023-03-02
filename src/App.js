import React from "react";
import {
  BrowserRouter,
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
import { AppContext } from "./Context/AppContext";
import DetallesPdf from "./Pages/detalles/DetallesPdf";

function App() {
  const { auth } = React.useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
          <div className="flex">
            <Routes>
              <Route path="/" element={<AppLayout />}>
             
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "ADMIN" || "SUPERADMIN"}
                    >
                      <ProductPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invernadero"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "ADMIN" || "SUPERADMIN"}
                    >
                      <GreenhousePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "ADMIN" || "SUPERADMIN"}
                    >
                      <CategoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mesa"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "ADMIN" || "SUPERADMIN"}
                    >
                      <DeskPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "ADMIN" || "SUPERADMIN"}
                    >
                      <CustomerPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orden"
                  element={
                    <ProtectedRoute
                      isAllowed={auth.role == "USER" || "ADMIN" || "SUPERADMIN"}
                    >
                      <OrdenPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

                <Route
                  path="/pdf"
                  element={
                    <ProtectedRoute isAllowed={auth.role == "USER" || "ADMIN" || "SUPERADMIN"}>
                      <DetallesPdf />
                    </ProtectedRoute>
                  }
                />
            </Routes>
          </div>
    </BrowserRouter>
  );
}

export default App;
