
import { FaHandshake } from 'react-icons/fa'; 
import { VscClose } from 'react-icons/vsc';   
import styles from './ModalGracias.module.css';
export default function ModalGracias({ setShow }) {
  
  const cerrar = () => setShow(false);

  return (
    <div className={styles.modalGraciasContainer}>
      {/* Botón de cerrar 'X' posicionado en la esquina */}
      <button onClick={cerrar} className={styles.modalGraciasCloseBtn}>
        <VscClose size={24} />
      </button>
      <p className={styles.textoSuperior}>Estamos felices de acompañarte</p>
      
      <div className={styles.iconoContainer}>
        <FaHandshake size={70} className={styles.iconoManos} />
      </div>
      
      <h2 className={styles.textoPrincipal}>¡Gracias por tu confianza!</h2>
    </div>
  );
}