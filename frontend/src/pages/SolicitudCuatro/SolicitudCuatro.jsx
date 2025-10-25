import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SolicitudCuatro.css';

const SolicitudEnviada = () => {
  const navigate = useNavigate();

  return (
    <div className="solicitud-enviada-container">
      
      <h1 className="solicitud-enviada-title">Solicitud enviada</h1>
      <p className="solicitud-enviada-subtitle">
        Estamos revisando tu información. Te responderemos en 24-72 horas hábiles.
      </p>

      <h2 className="solicitud-enviada-section-title">Resúmen compacto</h2>
      <div className="resumen-details">
        <p><strong>Estado:</strong> En revisión</p>
        <p><strong>Caso:</strong> FP-000123</p>
        <p><strong>Producto:</strong> Crédito PyME</p>
        <p><strong>Monto solicitado:</strong> $ 5,000.00</p>
        <p><strong>Fecha de envío:</strong> 20 oct 2025, 11:32</p>
      </div>

      <h2 className="solicitud-enviada-section-title">Siguientes pasos</h2>
      <div className="siguientes-pasos">
        <p>Validaremos tu identidad y documentos.</p>
        <p>Evaluaremos tu solicitud.</p>
        <p>Si es aprobada, firmarás el contrato y coordinaremos el desembolso.</p>
        <p>Te enviamos un correo con la confirmación de tu solicitud.</p>
      </div>

      <div className="solicitud-actions">
        <button className="botones btn-primario">Ver estado de mi solicitud</button>
        <button onClick={() => navigate('/dashboard')} className="botones btn-secundario">Ir al panel principal</button>
      </div>
      
      <div className="solicitud-footer">
        <a href="#">¿Dudas? Contáctanos por chat o WhatsApp.</a>
      </div>

    </div>
  );
};

export default SolicitudEnviada;