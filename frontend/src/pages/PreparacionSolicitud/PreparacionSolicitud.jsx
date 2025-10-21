import { useNavigate } from 'react-router-dom';
import './PreparacionSolicitud.css';
import { FiUser, FiSmartphone, FiMail } from 'react-icons/fi';

const PreparacionSolicitud = () => {
  const navigate = useNavigate();

  return (
    <div className="preparacion-container">
      <div className="preparacion-content">
        <h1>¡Prepárate para solicitar tu crédito PyME!</h1>
        <p className="subtitle">Sigue estos pasos para acelerar tu solicitud y aprobación</p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">
              <FiUser size={32} />
            </div>
            <h3>Representante legal</h3>
            <p>La solicitud debe ser hecha por el representante legal de la empresa</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <FiSmartphone size={32} />
            </div>
            <h3>Verificación de identidad</h3>
            <p>Ten tu celular a mano: te pediremos una foto para validar tu identidad</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <FiMail size={32} />
            </div>
            <h3>Correo activo</h3>
            <p>Mantén tu correo abierto para recibir el código de confirmación</p>
          </div>
        </div>

        <button onClick={() => navigate ('/dashboard/prueba')} className="btn-entendido">Entendido</button>
      </div>
    </div>
  );
};

export default PreparacionSolicitud;