import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/authContext";
import { CartProvider } from "./context/cartContext";

// ProtectedRoute must run inside Router (we use a wrapper component)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // send user to login and remember where they came from
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

const AppContainer = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default function App() {
  // Providers wrap the Router so any component can access contexts
  return (
    <AuthProvider>
      <CartProvider>
        <AppContainer />
      </CartProvider>
    </AuthProvider>
  );
}
