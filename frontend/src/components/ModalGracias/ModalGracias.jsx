import { FaHandshake } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import styles from './ModalGracias.module.css'
import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'

export default function ModalGracias({ setShow }) {
  const modalRef = useRef(null)
  const navigate = useNavigate()
  const cerrar = () => {
    setShow(false)
    navigate('/dashboard')
  }
  // Detectar click fuera del modal
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        cerrar()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setShow])

  return (
    <div ref={modalRef} className={styles.modalGraciasContainer}>
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
  )
}
