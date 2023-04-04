import React, { useEffect } from "react";
import { Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import ForgetPassword from "./pages/authentication/ForgetPassword";
import Homepage from "./pages/landing/Homepage";
import Dashboard from "./pages/dashboard/Dashboard";
import Blackbox from "./pages/dashboard/blackbox/Blackbox";
import ProductList from "./pages/dashboard/blackbox/ProductList";
import Profile from "./pages/dashboard/profile/Profile";
import SideBarLayout from "./Component/Layout/SideBarLayout";
import ResetPassword from "./pages/authentication/ResetPassword";
import Product from "./pages/dashboard/blackbox/Product";
import SuppliersList from "./pages/dashboard/supplier/SuppliersList";
import Favorites from "./pages/dashboard/supplier/Favorites";
import SupplierDetails from "./pages/dashboard/supplier/SupplierDetails";
import SupplierProductDetails from "./pages/dashboard/supplier/SupplierProductDetails";
import Trends from "./pages/dashboard/trends/Trends";
import Admin from "./pages/admin/Admin";
import Page404 from "./utils/404";

const App = () => {
  const navigate = useNavigate();

  let { token, login, logout, userId, name } = useAuth();
  token = localStorage.getItem("userData").token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  let routes;
  if (!token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/recover-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/admin" element={<Admin />} />

        <Route path="/" element={<SideBarLayout />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/blackbox" element={<Blackbox />} />
          <Route exact path="/blackbox/products" element={<ProductList />} />
          <Route exact path="/blackbox/products/:asin" element={<Product />} />
          <Route exact path="/suppliers" element={<SuppliersList />} />
          <Route exact path="/suppliers/favorites" element={<Favorites />} />
          <Route
            exact
            path="/suppliers/:sId/details"
            element={<SupplierDetails />}
          />
          <Route
            exact
            path="/suppliers/product/details"
            element={<SupplierProductDetails />}
          />
          <Route exact path="/trends" element={<Trends />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
        name,
      }}
    >
      <Router>
        {routes} <Navigate to="/login" />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
