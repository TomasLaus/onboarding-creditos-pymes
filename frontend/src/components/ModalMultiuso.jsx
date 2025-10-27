import './ModalMultiuso.css'
import Modal from 'react-bootstrap/Modal'

/**
 * Componente genérico para mostrar un modal utilizando react-bootstrap.
 * @param {object} props
 * @param {boolean} props.show - Estado que controla si el modal es visible.
 * @param {function} props.setShow - Función para actualizar el estado de visibilidad.
 * @param {string} [props.bgColor] - Clase de color de fondo opcional para el cuerpo del modal.
 * @param {React.ReactNode} props.children - Contenido a mostrar dentro del modal.
 */
export default function Modalizar({ setShow, show, bgColor, children }) {
  const cerrarModal = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={cerrarModal}
      centered
      className="modal-agradecimiento"
    >
      {/* El prop 'onHide' permite cerrar el modal haciendo clic fuera o con la tecla Esc */}
      <Modal.Body className={bgColor}>
        {children}
      </Modal.Body>
    </Modal>
  )
}
