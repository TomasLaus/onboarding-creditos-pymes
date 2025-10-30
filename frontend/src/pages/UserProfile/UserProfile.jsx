import styles from './UserProfile.module.css';
import { FaUserAlt } from "react-icons/fa";
import { BsPencilSquare, BsInfoCircleFill } from "react-icons/bs"; 

const UserProfile = () => {
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
              <a href="#" className={`${styles.editLink} ${styles.avatarEditLink}`}>
                <BsPencilSquare /> 
                <span>Editar datos</span>
              </a>
            </div>
            <div className={styles.profileInfo}>
              <h2>Empresa S.A.</h2>
              <p>Buenos Aires, Argentina</p>
              <p className={styles.emailText}>Ej: nombre@empresa.com</p>
              <div className={styles.statusWarning}>
                Cuenta no verificada <BsInfoCircleFill />
              </div>
            </div>
          </div>         
        </div>

        <div className={styles.actionArea}>
          <button className={styles.ctaButton}>
            Solicita Tu Crédito
          </button>
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
              <span>Ej. Panadería Las Flores S.A.</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Nombre comercial:</strong>
              <span>Ej. Panadería Las Flores</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Email:</strong>
              <span>Ej. nombre@empresa.com</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Actividad económica:</strong>
              <span>Ej. Comercio minorista de pan</span>
            </div>
            <div className={styles.dataItem}>
              <strong>País de origen capital:</strong>
              <span>Ej. Argentina</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Domicilio fiscal:</strong>
              <span>Ej. Av. San Martín 123, Buenos Aires</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Número partida registral:</strong>
              <span>Ej. RC-2021-12345</span>
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
              <span>Ej. Juan Pérez</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Tipo y número de documento:</strong>
              <span>Ej. DNI 20123456</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Cargo:</strong>
              <span>Ej. Gerente de Operaciones</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Dirección:</strong>
              <span>Ej. Av. Principal 45, Buenos Aires</span>
            </div>
            <div className={styles.dataItem}>
              <strong>Teléfono:</strong>
              <span>Ej. +54 11 1234 5678</span>
            </div>
          </div>

          <a href="#" className={`${styles.editLink} ${styles.cardEditLink}`}>
            <BsPencilSquare /> <span>Editar datos</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;