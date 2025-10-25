import { useNavigate } from 'react-router-dom';
import styles from './EstadoCredito.module.css';

const EstadoCredito = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <h1 className={styles.mainTitle}>Estado de Crédito</h1>
      <p className={styles.subtitle}>Revisa el estado de todas tus solicitudes de crédito y onboarding</p>

      {/* Navegación de pestañas */}
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabButton} ${styles.activeTab}`}>Todas (3)</button>
        <button className={`${styles.tabButton} ${styles.tabApproved}`}>Aprobadas (1)</button>
        <button className={`${styles.tabButton} ${styles.tabRejected}`}>Rechazadas (1)</button>
        <button className={`${styles.tabButton} ${styles.tabObserved}`}>En observación (1)</button>
      </div>

      {/* Tarjeta de estado Aprobada */}
      <div className={`${styles.card} ${styles.approvedCard}`}>
        <span className={`${styles.statusBadge} ${styles.approvedBadge}`}>Aprobada</span>
        <p className={styles.cardId}>ID Caso: FP-000123</p>
        <h3 className={styles.cardTitle}>Capital de trabajo | $ 5,000 | Plazo 24 meses</h3>
        <p className={`${styles.cardDescription} ${styles.approvedDescription}`}>¡Felicidades! Revisa y firma tu oferta para el desembolso</p>
        <button 
          className={`${styles.cardButton} ${styles.primaryButton}`}
          onClick={() => navigate('/dashboard/aprobacion-credito')}
        >Ver oferta y firmar</button>
      </div>

      {/* Tarjeta de estado Observada */}
      <div className={`${styles.card} ${styles.observedCard}`}>
        <span className={`${styles.statusBadge} ${styles.observedBadge}`}>Observada</span>
        <p className={styles.cardId}>ID Caso: FP-000122</p>
        <p className={`${styles.cardDescription} ${styles.observedDescription}`}>Urgente: Faltan documentos. Sube faltantes para continuar</p>
        <button className={`${styles.cardButton} ${styles.primaryButton}`}>Corregir documentos</button>
      </div>

      {/* Tarjeta de estado Rechazada */}
      <div className={`${styles.card} ${styles.rejectedCard}`}>
        <span className={`${styles.statusBadge} ${styles.rejectedBadge}`}>Rechazada</span>
        <p className={styles.cardId}>ID Caso: FP-000121</p>
        <p className={`${styles.cardDescription} ${styles.rejectedDescription}`}>Verificación no superada / Documentación inconsistente.</p>
        <button className={`${styles.cardButton} ${styles.primaryButton}`}>Ver detalles</button>
      </div>
    </div>
  );
};

export default EstadoCredito;