import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

function AppRouter() {
  const { tokenLogin } = useAppContext()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={tokenLogin ? <DashboardPage /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={tokenLogin ? <DashboardPage /> : <RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={tokenLogin ? <DashboardPage /> : <LoginPage />}
        />

        {/* fallback por si entra a una ruta no válida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRouter
