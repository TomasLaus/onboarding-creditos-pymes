import { useAppContext } from '../../context/appContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './solicitudesTodas.css'
import { formatStrAddingPrefix } from '../../utils/strings-utils'

const SolicitudesTodas = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const containerRef = useRef(null)

  const { userData } = useAppContext()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [selectedApp, setSelectedApp] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const id_empresa = userData.idCompany
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${URL_BACKEND}/api/company/${id_empresa}`
        )
        setApplications(response.data.data.applications)
        console.log(response.data.data.applications)
      } catch (err) {
        console.error('Error al obtener solicitudes:', err)
      }
    }
    fetchApplications()
  }, [URL_BACKEND, userData])

  // Scroll al final cada vez que se actualizan los documentos
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [documents])

  const handleViewDetails = id => {
    const app = applications.find(app => app.id === id)
    setSelectedApp(id)
    setDocuments(app?.documents || [])
  }

  return (
    <div className="dashboard-view " ref={containerRef}>
      <div className="welcome-message">
        <h1>📄 Documentos de solicitudes</h1>
        <p>
          Aquí podés ver todas las solicitudes de crédito que realizaste con{' '}
          <strong>Fintech Pyme</strong>.
        </p>
      </div>

      <div className="stats-cards">
        {applications.length === 0 ? (
          <div className="card">
            <h3>No hay solicitudes</h3>
            <p>0</p>
            <span>Sin registros</span>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <div
                key={app.id}
                className={`card application-card ${
                  selectedApp === app.id ? 'selected' : ''
                }`}
              >
                <p style={{ fontSize: '12px' }}>
                  <strong>ID solicitud:</strong>{' '}
                  {formatStrAddingPrefix(app.id, 'FP', 6)}
                </p>

                <p style={{ fontSize: '12px' }}>
                  <strong>Producto:</strong> {app.product || '—'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong>Monto:</strong> ${app.amount || '—'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong>Moneda:</strong> {app.coin || '—'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong>Plazo:</strong>{' '}
                  {app.termMonths ? `${app.termMonths} meses` : '—'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong>Estado:</strong> {app.status || 'Pendiente'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong>Fecha:</strong>{' '}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
                <button
                  className="btn-primary-dashboard"
                  onClick={() => {
                    handleViewDetails(app.id)
                  }}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔽 Sección de documentos */}
      {selectedApp && (
        <div className="documents-section">
          <h2> Documentos de la solicitud: </h2>
          {documents.length === 0 ? (
            <p>No hay documentos disponibles para esta solicitud.</p>
          ) : (
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  {/* <th>Versión</th> */}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{doc.type}</td>
                    {/* <td>{doc.version}</td> */}
                    <td>
                      <a
                        href={URL_BACKEND + doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-doc"
                      >
                        Ver documento
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default SolicitudesTodas
