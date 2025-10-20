// import { Routes, Route } from 'react-router-dom'
// import Home from '../pages/Home/Home'
// import RegisterPage from '../pages/RegisterPage/RegisterPage'
// import LoginPage from '../pages/LoginPage/LoginPage'
// import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
// import DashboardPage from '../pages/DashboardPage/DashboardPage'
// import { useAppContext } from '../context/appContext'
// import { Navigate } from 'react-router-dom'

// function AppRouter() {
//   const { tokenLogin } = useAppContext()
//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={tokenLogin ? <DashboardPage /> : <LoginPage />}
//         />

//         <Route
//           path="/register"
//           element={tokenLogin ? <DashboardPage /> : <RegisterPage />}
//         />

//         <Route
//           path="/dashboard"
//           element={tokenLogin ? <DashboardPage /> : <LoginPage />}
//         />

//         {/* fallback por si entra a una ruta no válida */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   )
// }

// export default AppRouter
// src/router/AppRouter.jsx

// src/router/AppRouter.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import MainLayout from '../layouts/MainLayouts.jsx'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import { useAppContext } from '../context/appContext'

function AppRouter() {
  const { tokenLogin } = useAppContext()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={tokenLogin ? <Dashboard /> : <Home />} />
          <Route
            path="/register"
            element={tokenLogin ? <Dashboard /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={tokenLogin ? <Dashboard /> : <LoginPage />}
          />
        </Route>
        <Route
          path="/dashboard"
          element={tokenLogin ? <Dashboard /> : <LoginPage />}
        />
        <Route path="/activar-cuenta" element={<ActivarCuenta />} />
      </Routes>
    </>
  )
}

export default AppRouter
