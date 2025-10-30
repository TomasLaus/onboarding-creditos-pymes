import styles from './UserProfile.module.css'
import { FaUserAlt } from 'react-icons/fa'
import { BsPencilSquare, BsInfoCircleFill } from 'react-icons/bs'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const UserProfile = () => {
  const { userData, creditApplicationData, tokenLogin } = useAppContext()

  useEffect(() => {}, [])

  return (
    <div className={styles.profileContainer}>
      <h1>Mi perfil</h1>
      <header className={styles.profileHeader}>
        <div className={styles.profileLeft}>
          <div className={styles.profileIdentity}>
            <div className={styles.avatarGroup}>
              <div className={styles.avatar}>
                <FaUserAlt />
              </div>
              <a
                href="#"
                className={`${styles.editLink} ${styles.avatarEditLink}`}
              >
                <BsPencilSquare />
                <span>Editar datos</span>
              </a>
            </div>
            <div className={styles.profileInfo}>
              <h2>{userData.legalName}</h2>
              <p>Buenos Aires, Argentina</p>
              <p className={styles.emailText}>{userData.email}</p>
              <div className={styles.statusWarning}>
                Cuenta verificada <BsInfoCircleFill />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionArea}>
          <button className={styles.ctaButton}>Solicita Tu Crédito</button>
          <p>Pre-evaluación instantánea</p>
          <p>Respuesta 24-72 h</p>
        </div>
      </header>

      {/* GRID INFERIOR: DETALLES */}

      <div className={styles.detailsGrid}>
        {/*  DATOS EMPRESA */}

        <div className={styles.infoCard}>
          <h3>Datos de la empresa</h3>

          <div className={styles.dataGroup}>
            <div className={styles.dataItem}>
              <strong>Razón social:</strong>
              <span>{userData.legalName}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Nombre comercial:</strong>
              <span>{userData.legalName}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Email:</strong>
              <span>{userData.email}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Actividad económica:</strong>
              <span>{userData.economicActivity || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>País de origen capital:</strong>
              <span>{userData.countryOfOrigin || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Domicilio fiscal:</strong>
              <span>{userData.fiscalAddress || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Número partida registral:</strong>
              <span>{userData.taxId || 'no registrado'}</span>
            </div>
          </div>

          <a href="#" className={`${styles.editLink} ${styles.cardEditLink}`}>
            <BsPencilSquare /> <span>Editar datos</span>
          </a>
        </div>

        <div className={styles.infoCard}>
          <h3>Datos del representante legal</h3>

          <div className={styles.dataGroup}>
            <div className={styles.dataItem}>
              <strong>Apellido y Nombres:</strong>
              <span>{userData.representativeName || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Tipo y número de documento:</strong>
              <span>{userData.representativeId || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Cargo:</strong>
              <span>{userData.representativePosition || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Dirección:</strong>
              <span>{userData.representativeAddress || 'no registrado'}</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Teléfono:</strong>
              <span>{userData.phone || 'no registrado'}</span>
            </div>
          </div>

          <a href="#" className={`${styles.editLink} ${styles.cardEditLink}`}>
            <BsPencilSquare /> <span>Editar datos</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
