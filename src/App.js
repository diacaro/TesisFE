import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.scss';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Sidebar from "./Components/sidebar/Sidebar";
import GreenhousePage from "./Pages/greenhouse/GreenhousePage";
import 'boxicons/css/boxicons.min.css'
import CustomerPage from "./Pages/customer/CustomerPage";
import ProductPage from "./Pages/product/ProductPage";
import DeskPage from "./Pages/desk/DeskPage";
import CategoryPage from "./Pages/category/CategoryPage"; 
import DetallesPage from "./Pages/detalles/DetallesPage"; 
import OrdenPage from "./Pages/orden/OrdenPage";
import AppLayout from "./Components/layout/AppLayout";
import Login from "./Pages/login/Login";
import { ProtectedRoute } from "./Components/router/ProtectedRoute";


function App() {

  return (
    // <InvoiceProvider>

    <BrowserRouter>

        <Routes>
            <Route path='/login' element={<Login />}/>

        </Routes>

      <div className="flex">  
        <Routes > 
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<AppLayout />}>
              <Route path="/invernadero" element={<GreenhousePage />} />
              {/* <Route path="/invoices" element={<InvoiceNew />} /> */}
              <Route path="/products" element={<ProductPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/mesa" element={<DeskPage />} />
              <Route path="/customers" element={<CustomerPage />} />
              {/* <Route path="/detalles" element={<DetallesPage />} /> */}
              {/* <Route path="/detalles/:id" element={<DetallesPage />} /> */}
              <Route path="/orden" element={<OrdenPage />} />
              <Route path="/user/" />
            </Route>

          </Route>

        </Routes>
      </div>

    </BrowserRouter>

    // </InvoiceProvider>
  );
}

export default App;
