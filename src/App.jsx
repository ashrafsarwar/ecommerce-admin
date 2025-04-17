import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import Login from "./Pages/Login/Login";
import AdminSetting from "./components/AdminSetting/AdminSetting";
import { AdminContextProvider } from "./components/Context/ContextApi";
import { Toaster } from "react-hot-toast";

const App = () => {
  const navigate = useNavigate();
  const authorized = localStorage.getItem("auth-token");

  // Redirect to login if not authorized
  useEffect(() => {
    if (!authorized) {
      navigate("/login");
    } else if (authorized && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [authorized, navigate]);

  return (
    <AdminContextProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        {authorized && <Admin />}
      </div>
      <Toaster />
    </AdminContextProvider>
  );
};

export default App;
