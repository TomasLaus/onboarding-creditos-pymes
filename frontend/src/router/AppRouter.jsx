import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' // Importa Navigate
import Home from '../pages/Home/Home'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import MainLayout from '../layouts/MainLayouts.jsx'
import { useAppContext } from '../context/appContext'

import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout'
import PreparacionSolicitud from '../pages/PreparacionSolicitud/PreparacionSolicitud'
import DashboardView from '../components/DashboardView/DashboardView.jsx'
import SolicitudUno from '../pages/SolicitudUno/SolicitudUno.jsx'
import SolicitudDos from '../pages/SolicitudDos/SolicitudDos.jsx'
import SolicitudTres from '../pages/SolicitudTres/SolicitudTres.jsx'
import ActivarCuenta from '../pages/ActivarCuenta/ActivarCuenta.jsx'
import SolicitudesTodas from '../pages/SolicitudesTodas/SolicitudesTodas.jsx'
import SolicitudCuatro from '../pages/SolicitudCuatro/SolicitudCuatro.jsx'
import AprobacionCredito from '../pages/AprobacionCredito/AprobacionCredito.jsx'
import EstadoCredito from '../pages/EstadoCredito/EstadoCredito.jsx'
import UserProfile from '../pages/UserProfile/UserProfile.jsx'

function AppRouter() {
  const { tokenLogin } = useAppContext()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/:firstaccess" element={<LoginPage />} />
          <Route path="/activar-cuenta" element={<ActivarCuenta />} />
        </Route>

        <Route
          path="/dashboard"
          element={tokenLogin ? <DashboardLayout /> : <Navigate to="/" />}
        >
          {/* Rutas hijas */}
          <Route index element={<DashboardView />} />
          <Route path="solicitudes-todas" element={<SolicitudesTodas />} />
          <Route path="preparacion" element={<PreparacionSolicitud />} />
          <Route path="solicitud-uno" element={<SolicitudUno />} />
          <Route path="solicitud-dos" element={<SolicitudDos />} />
          <Route path="solicitud-tres" element={<SolicitudTres />} />
          <Route path="solicitud-cuatro" element={<SolicitudCuatro />} />
          <Route path="estado-credito" element={<EstadoCredito />} />
          <Route path="perfil-usuario" element={<UserProfile />} />
          <Route
            path="aprobacion-credito/:id_credito"
            element={<AprobacionCredito />}
          />
        </Route>


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRouter
