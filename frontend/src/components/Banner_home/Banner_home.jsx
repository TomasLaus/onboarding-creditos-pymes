import { Link } from 'react-router-dom';
import './Banner_home.css'; 
import bannerBackground from '../../assets/background_banner_home.jpg'; 

const Banner_home = () => {
 
  const bannerStyle = {
    
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerBackground})`
  };

  return (
    <section className="hero-banner" style={bannerStyle}>
      <div className="banner-content">
        <h1 className="banner-title">
          Créditos rápidos y <br /> 100% digitales para <br /> tu PYME.
        </h1>
        <p className="banner-subtitle">
          ¡Solicita tu crédito en minutos, 100% digital y con respaldo confiable!
        </p>
        <div className="banner-actions">
          <Link to="/solicitar-credito" className="btn-banner-primary">
            Solicitar Crédito Ahora
          </Link>
          <Link to="/mas-informacion" className="btn-banner-secondary">
            Conocer más
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner_home;