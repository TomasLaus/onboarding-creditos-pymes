

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Importa Navigate
import Home from "../pages/Home/Home";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import MainLayout from "../layouts/MainLayouts.jsx";
import { useAppContext } from "../context/appContext";


import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import PreparacionSolicitud from "../pages/PreparacionSolicitud/PreparacionSolicitud";
import DashboardView from "../components/DashboardView/DashboardView.jsx";
import Prueba from "../pages/prueba/prueba.jsx";

function AppRouter() {
  const { tokenLogin } = useAppContext();
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={tokenLogin ? <DashboardLayout /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={tokenLogin ? <DashboardLayout /> : <LoginPage />}
          />
        </Route>

// Rutas protegidas dentro del layout del dashboard //

        <Route
          path="/dashboard"
          element={tokenLogin ? <DashboardLayout /> : <Navigate to="/login"/>}
        >
           {/* Rutas hijas */}
          <Route index element={<DashboardView />} />
          <Route path="preparacion" element={<PreparacionSolicitud />} />
          <Route path="prueba" element={<Prueba />} />
       </Route>

/////////////////////////////////////////////////////////////////

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppRouter
