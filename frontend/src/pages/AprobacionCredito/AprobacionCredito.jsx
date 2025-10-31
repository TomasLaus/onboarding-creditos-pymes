import React, { useState, useEffect } from 'react'
import styles from './AprobacionCredito.module.css'
import { FiClock } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import Modalizar from '../../components/ModalMultiuso'
import ModalGracias from '../../components/ModalGracias/ModalGracias'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import {
  formatCurrency,
  formatStrAddingPrefix
} from '../../utils/strings-utils'

const CreditoAprobado = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const { id_credito } = useParams()
  const [showGraciasModal, setShowGraciasModal] = useState(false)
  const { tokenLogin } = useAppContext()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [contractAccepted, setContractAccepted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [application, setApplication] = useState(0)

  useEffect(() => {
    axios
      .get(`${URL_BACKEND}/api/credit-applications/${id_credito}`, {
        headers: {
          Authorization: `Bearer ${tokenLogin}`
        }
      })
      .then(response => {
        setApplication(response.data)
        console.log(response.data)
      })
  }, [])

  const isButtonDisabled = !termsAccepted || !contractAccepted

  const handleTermsChange = () => setTermsAccepted(!termsAccepted)
  const handleContractChange = () => setContractAccepted(!contractAccepted)

  const handleAcceptAndSignClick = () => {
    if (isButtonDisabled) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
      setShowGraciasModal(true)
    }
  }

  return (
    <div className={styles.offerContainer}>
      <div className={styles.headerAprobation}>
        <div className={styles.headerText}>
          <h1>¡Tu crédito fue aprobado!</h1>
        </div>
        <div className={styles['header-bottom-section']}>
          <p className={styles['header-description']}>
            Revisa los términos y firma para continuar
          </p>
          <div className={styles['alert-wrapper']}>
            <div className={styles.alertBox}>
              <div className={styles['alertBox-content']}>
                <FiClock className={styles.alertIcon} />
                <div className={styles.alertText}>
                  <strong>Oferta válida hasta</strong>
                  <span>18 nov 2025, 18:00</span>
                </div>
              </div>
            </div>
            <span className={styles.caseNumber}>
              Caso: {formatStrAddingPrefix(application.id, 'FP-')}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span>Resumen de oferta:</span>
          <strong>{formatCurrency(application.amount)}</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Monto aprobado:</span>
          <strong>{application.termMonths} meses</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Tasa estimada:</span>
          <strong>36.5%</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Cuota mensual estimada:</span>
          <strong>$ 296.00</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Comisiones (desembolso):</span>
          <strong>$ 120</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Total estimado a pagar (cuotas):</span>
          <strong>$ 7,104.00 (296 x 24)</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Total incl. comisión inicial:</span>
          <strong>US$ 7,224.00</strong>
        </div>
        <div className={styles.detailRow}>
          <span>Cuenta de desembolso:</span>
          <strong>
            BCP ***1234{' '}
            <a href="#" className={styles.link}>
              [Cambiar]
            </a>
          </strong>
        </div>

        <a href="#" className={`${styles.link} ${styles.paymentScheduleLink}`}>
          Ver cronograma de pagos
        </a>
      </div>

      <div className={styles.agreement}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="acceptTerms"
            checked={termsAccepted}
            onChange={handleTermsChange}
          />
          <label htmlFor="acceptTerms">
            He leído y acepto la Hoja de Resumen (PDF)
            <a href="#" className={styles.link}>
              [ Descargar ]
            </a>
          </label>
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="acceptContract"
            checked={contractAccepted}
            onChange={handleContractChange}
          />
          <label htmlFor="acceptContract">He leído y acepto el contrato</label>
        </div>
        <p className={styles.disclaimer}>
          * La tasa estimada y montos pueden variar levemente según la fecha de
          desembolso.
        </p>
        {showWarning && (
          <p className={styles.warningMessage}>
            Recuerda aceptar los términos y condiciones para poder continuar.
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <h3>Acciones</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.btn} ${styles.btnPrimary} ${
              isButtonDisabled ? styles.btnDisabled : ''
            }`}
            onClick={handleAcceptAndSignClick}
          >
            Aceptar y firmar ahora
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            disabled
          >
            Solicitar ajuste
          </button>
          <button
            className={`${styles.btn} ${styles.btnTertiary}`}
            disabled
          >
            Rechazar oferta
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <a href="#" className={styles.footerLink}>
          ¿Dudas? Contáctanos por chat o WhatsApp
        </a>
      </div>

      <Modalizar show={showGraciasModal} setShow={setShowGraciasModal}>
        <ModalGracias setShow={setShowGraciasModal} />
      </Modalizar>
    </div>
  )
}

export default CreditoAprobado;
