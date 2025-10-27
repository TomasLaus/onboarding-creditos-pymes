import { useAppContext } from '../../context/appContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './DashboardView.css'

const DashboardView = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL
  const { userData, tokenLogin } = useAppContext()
  const navigate = useNavigate()
  const [applications, setApplications] = useState(0)

  const handleStartNow = () => {
    navigate('/dashboard/preparacion')
  }

  useEffect(() => {
    const id_empresa = userData.idCompany
    axios
      .get(`${URL_BACKEND}/api/company/${id_empresa}`, {
        headers: {
          Authorization: `Bearer ${tokenLogin}`
        }
      })
      .then(response => {
        setApplications(response.data.data.applications.length)
        //console.log(response.data.data.applications.length)
      })
  }, [])

  return (
    <div className="dashboard-view">
      <div className="welcome-message">
        <h1>
          <span role="img" aria-label="hand-wave">
            👋
          </span>{' '}
          ¡Hola, {userData.legalName}!
        </h1>
        <p>
          Bienvenido a Fintech Pyme, tu espacio para solicitar créditos PyME sin
          burocracia.
        </p>
      </div>
      <div className="stats-cards">
        <div className="card">
          <h3>Solicitudes activas</h3>
          <p>{applications + 2}</p>
          <span>Por completar</span>
        </div>
        <div className="card">
          <h3>Créditos aprobados</h3>
          <p>{applications}</p>
          <span>Aprobado</span>
        </div>
        <div className="card">
          <h3>Historial</h3>
          <p>0</p>
          <span>Completados</span>
        </div>
      </div>
      <div className="account-ready-card">
        <h2>¡Tu cuenta está lista!</h2>
        <p>
          Bienvenido a Fintech Pyme, tu espacio para solicitar créditos PyME sin
          burocracia.
        </p>
        <div className="actions">
          <button className="btn-primary-dashboard" onClick={handleStartNow}>
            Empezar ahora
          </button>
          <button
            onClick={() => navigate('/dashboard/solicitudes-todas')}
            className="btn-secondary-dashboard"
          >
            Ver documentación
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardView
