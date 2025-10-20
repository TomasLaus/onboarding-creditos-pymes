import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import MainLayout from '../layouts/MainLayouts.jsx'
import ActivarCuenta from '../pages/ActivarCuenta/ActivarCuenta'
import { useAppContext } from '../context/appContext'

// 🔒 Solo accesible si hay token
const PrivateRoute = ({ children }) => {
  const { tokenLogin } = useAppContext()
  return tokenLogin ? children : <Navigate to="/login" replace />
}

// 🚫 Bloquea acceso si ya hay token
const PublicRoute = ({ children }) => {
  const { tokenLogin } = useAppContext()
  return !tokenLogin ? children : <Navigate to="/dashboard" replace />
}

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Públicas (solo sin token) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* 🔓 Pública SIEMPRE (incluso con token) */}
        <Route path="/activar-cuenta" element={<ActivarCuenta />} />

        {/* 🔒 Privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRouter
