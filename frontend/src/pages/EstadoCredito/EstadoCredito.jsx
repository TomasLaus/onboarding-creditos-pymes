import { useNavigate } from 'react-router-dom'
import styles from './EstadoCredito.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'
import {
  formatCurrency,
  formatStrAddingPrefix
} from '../../utils/strings-utils'

const EstadoCredito = () => {
  const navigate = useNavigate()
  const { userData, tokenLogin } = useAppContext()

  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const [applications, setApplications] = useState(0)

  useEffect(() => {
    const id_empresa = userData.idCompany
    axios
      .get(`${URL_BACKEND}/api/company/${id_empresa}`, {
        headers: {
          Authorization: `Bearer ${tokenLogin}`
        }
      })
      .then(response => {
        setApplications(response.data.data.applications)
        //console.log(response.data.data.applications.length)
      })
    console.log(applications)
  }, [])

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <h1 className={styles.mainTitle}>Estado de Crédito</h1>
      <p className={styles.subtitle}>
        Revisa el estado de todas tus solicitudes de crédito y onboarding
      </p>

      {/* Navegación de pestañas */}
      {/* DEJO TODAS LAS QUE VOY AGREGANDO COMO APROBADAS SOLO PARA DEMO DAY. LUEGO EDITAR.*/}
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabButton} ${styles.activeTab}`}>
          Todas ({applications.length + 2})
        </button>
        <button className={`${styles.tabButton} ${styles.tabApproved}`}>
          Aprobadas ({applications.length})
        </button>
        <button className={`${styles.tabButton} ${styles.tabRejected}`}>
          Rechazadas (1)
        </button>
        <button className={`${styles.tabButton} ${styles.tabObserved}`}>
          En observación (1)
        </button>
      </div>

      {/* Tarjeta de estado Aprobada */}
      {applications.length &&
        applications.map(x => (
          <>
            {/* Tarjeta de estado Aprobada */}
            <div className={`${styles.card} ${styles.approvedCard}`}>
              <span className={`${styles.statusBadge} ${styles.approvedBadge}`}>
                Aprobada
              </span>
              <p className={styles.cardId}>
                ID Caso: {formatStrAddingPrefix(x.id, 'FP-')}
              </p>
              <h3 className={styles.cardTitle}>
                {x.product} | {formatCurrency(x.amount)} | Plazo {x.termMonths}{' '}
                meses
              </h3>
              <p
                className={`${styles.cardDescription} ${styles.approvedDescription}`}
              >
                ¡Felicidades! Revisa y firma tu oferta para el desembolso
              </p>
              <button
                className={`${styles.cardButton} ${styles.primaryButton}`}
                onClick={() =>
                  navigate('/dashboard/aprobacion-credito/' + x.id)
                }
              >
                Ver oferta y firmar
              </button>
            </div>
          </>
        ))}

      {/* Tarjeta de estado Observada */}
      <div className={`${styles.card} ${styles.observedCard}`}>
        <span className={`${styles.statusBadge} ${styles.observedBadge}`}>
          Observada
        </span>
        <p className={styles.cardId}>ID Caso: FP-000122</p>
        <p
          className={`${styles.cardDescription} ${styles.observedDescription}`}
        >
          Urgente: Faltan documentos. Sube faltantes para continuar
        </p>
        <button className={`${styles.cardButton} ${styles.primaryButton}`}>
          Corregir documentos
        </button>
      </div>

      {/* Tarjeta de estado Rechazada */}
      <div className={`${styles.card} ${styles.rejectedCard}`}>
        <span className={`${styles.statusBadge} ${styles.rejectedBadge}`}>
          Rechazada
        </span>
        <p className={styles.cardId}>ID Caso: FP-000121</p>
        <p
          className={`${styles.cardDescription} ${styles.rejectedDescription}`}
        >
          Verificación no superada / Documentación inconsistente.
        </p>
        <button className={`${styles.cardButton} ${styles.primaryButton}`}>
          Ver detalles
        </button>
      </div>
    </div>
  )
}

export default EstadoCredito
