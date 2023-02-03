import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import GreenhousePage from "./Pages/greenhouse/GreenhousePage";
import CustomerPage from "./Pages/customer/CustomerPage";
import ProductPage from "./Pages/product/ProductPage";
import DeskPage from "./Pages/desk/DeskPage";
import InvoiceNew from "./Pages/invoice/InvoiceNew";
import InvoiceUpdate from "./Pages/invoice/InvoiceUpdate";
import {InvoiceProvider} from './Pages/invoice/InvoiceContext'
import CategoryPage from "./Pages/category/CategoryPage"; 
import DetallesPage from "./Pages/detalles/DetallesPage"; 
import OrdenPage from "./Pages/orden/OrdenPage";

function App() {
  return (
    <InvoiceProvider>
    <BrowserRouter>
    <ResponsiveAppBar />
    <Routes>   

      <Route path="/invernadero" element={<GreenhousePage />} />
      <Route path="/invoices" element={<InvoiceNew />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/mesa" element={<DeskPage />} />
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/detalles" element={<DetallesPage />} />
      <Route path="/detalles/:id" element={<DetallesPage />} />
      <Route path="/orden" element={<OrdenPage />} />
      <Route path="/invoiceUpdate/:id" element={<InvoiceUpdate />} />
      
    </Routes>

    </BrowserRouter>
    </InvoiceProvider>
  );
}

export default App;
