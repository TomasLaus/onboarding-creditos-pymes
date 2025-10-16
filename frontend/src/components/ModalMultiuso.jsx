import { ReactNode, SetStateAction } from 'react'
import './ModalMultiuso.css'
import Modal from 'react-bootstrap/Modal'
import { Spinner } from 'react-bootstrap'

//import './modal.css'

// interface ModalProps {
//
//     setShow: React.Dispatch<SetStateAction<boolean>>
//
//     show: boolean
//
//     bgColor?: string
//
//     children: ReactNode
//
// }

export default function Modalizar({ setShow, show, bgColor, children }) {
  const cerrarModal = () => setShow(false)

  return (
    <>
      <div className="modalmodal">
        <Modal
          show={show}
          onHide={cerrarModal}
          className="special_modal bg-dark"
        >
          {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
          <Modal.Body className={bgColor}>{children && children}</Modal.Body>
          {/* <Modal.Footer> */}
          {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
                            guardar
                        </Button> */}
          {/* </Modal.Footer> */}
        </Modal>
      </div>
    </>
  )
}
