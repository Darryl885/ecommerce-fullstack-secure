import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProfilePage from "./pages/user/ProfilePage";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import CreateProductPage from "./pages/products/CreateProductPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage.jsx"
import UpdateProductPage from "./pages/products/UpdateProductPage.jsx"
import CartPage from "./pages/cart/CartPage.jsx"
import AddressPage from "./pages/address/AddressPage.jsx";
import CheckoutPage from "./pages/orders/CheckoutPage.jsx";
import OrderSuccess from "./pages/orders/Page OrderSuccess.jsx"



export default function App() {
  const { user } = useContext(UserContext); // récupère l'user connecté

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addresses/new" element={<AddressPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        {/* <Route path="/order-success/:id" element={<OrderSuccess />} /> */}
       
        {/* Route admin protégée */}
        <Route
          path="/admin/products/create"
          element={
            user && user.role === "admin" ? (
              <CreateProductPage />
            ) : (
              <h1 className="text-center mt-5">Accès refusé 🚫</h1>
            )
          }
        />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* <-- Route pour le panier */}
        <Route
  path="/admin/products/update/:id"
  element={
    user?.role === "admin" ? (
      <UpdateProductPage />
    ) : (
      <Navigate to="/" />
    )
  }
/>


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
