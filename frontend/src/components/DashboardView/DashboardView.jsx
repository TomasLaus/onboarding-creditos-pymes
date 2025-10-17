import { useAppContext } from '../../context/appContext'

import './DashboardView.css';

const DashboardView = () => {
  const { userData } = useAppContext();
  return (
    <div className="dashboard-view">
      <div className="welcome-message">
        <h1><span role="img" aria-label="hand-wave">👋</span> ¡Hola, {userData.email}!</h1>
        <p>Bienvenido a Fintech Pyme, tu espacio para solicitar créditos PyME sin burocracia.</p>
      </div>
      <div className="stats-cards">
        <div className="card">
          <h3>Solicitudes activas</h3>
          <p>1</p>
          <span>Por completar</span>
        </div>
        <div className="card">
          <h3>Créditos aprobados</h3>
          <p>0</p>
          <span>Aprobado</span>
        </div>
        <div className="card">
          <h3>Historial</h3>
          <p>0</p>
          <span>Completados</span>
        </div>
      </div>
      <div className="account-ready-card">
        <h2>¡Tu cuenta está lista!</h2>
        <p>Bienvenido a Fintech Pyme, tu espacio para solicitar créditos PyME sin burocracia.</p>
        <div className="actions">
          <button className="btn-primary-dashboard">Empezar ahora</button>
          <button className="btn-secondary-dashboard">Ver documentación</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
