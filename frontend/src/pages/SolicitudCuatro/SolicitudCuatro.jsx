import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SolicitudCuatro.css'
import { useAppContext } from '../../context/appContext'
import {
  formatCurrency,
  formatStrAddingPrefix
} from '../../utils/strings-utils'
import { formatDateShortARG } from '../../utils/number-utils'
import axios from 'axios'

const SolicitudEnviada = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL
  const navigate = useNavigate()
  const { userData, creditApplicationData, tokenLogin } = useAppContext()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const getCreditApplicationById = async () => {
      try {
        const response = await axios.get(
          `${URL_BACKEND}/api/credit-applications/${creditApplicationData.idCreditApplication}`,
          {
            headers: {
              Authorization: `Bearer ${tokenLogin}`
            }
          }
        )
        setApplications(response.data)
        // console.log(response.data)
      } catch (err) {
        console.error('Error al obtener solicitudes:', err)
      }
    }

    getCreditApplicationById()
  }, [URL_BACKEND, userData])

  return (
    <div className="solicitud-enviada-container">
      <h1 className="solicitud-enviada-title">Solicitud enviada</h1>
      <p className="solicitud-enviada-subtitle">
        Estamos revisando tu información. Te responderemos en 24-72 horas
        hábiles.
      </p>

      <h2 className="solicitud-enviada-section-title">Resúmen compacto</h2>
      <div className="resumen-details">
        <p>
          <strong>Estado:</strong> En revisión
        </p>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          <strong>Caso:</strong>{' '}
          {formatStrAddingPrefix(applications.id, 'FP', 6)}
        </p>
        <p>
          <strong>Producto:</strong> {applications.product}
        </p>
        <p>
          <strong>Monto solicitado:</strong>{' '}
          {formatCurrency(applications.amount)}
        </p>
        <p>
          <strong>Fecha de envío:</strong>{' '}
          {formatDateShortARG(applications.startedAt)}
        </p>
      </div>

      <h2 className="solicitud-enviada-section-title">Siguientes pasos</h2>
      <div className="siguientes-pasos">
        <p>Validaremos tu identidad y documentos.</p>
        <p>Evaluaremos tu solicitud.</p>
        <p>
          Si es aprobada, firmarás el contrato y coordinaremos el desembolso.
        </p>
        <p>Te enviamos un correo con la confirmación de tu solicitud.</p>
      </div>

      <div className="solicitud-actions">
        <button
          onClick={() => navigate('/dashboard/estado-credito')}
          className="botones btn-primario"
        >
          Ver estado de mi solicitud
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="botones btn-secundario"
        >
          Ir al panel principal
        </button>
      </div>

      <div className="solicitud-footer">
        <a href="#">¿Dudas? Contáctanos por chat o WhatsApp.</a>
      </div>
    </div>
  )
}

export default SolicitudEnviada
