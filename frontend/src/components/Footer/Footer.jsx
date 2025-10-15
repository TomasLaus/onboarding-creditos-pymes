import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import logo from "../../assets/logo_fintech-pyme.png";
import secure from "../../assets/secure.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Columna 1: Logo e información */}
        <div className="footer-logo">
          <img src={logo} alt="Fintech Pyme Logo" className="logo-image" />
          <p>
            Impulsamos el crecimiento de las PYMES con crédito rápido y digital.
            <br />
            Agilidad financiera al alcance de tu negocio
          </p>
          <h4>Síguenos</h4>
          <div className="socials">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <SiX />
          </div>
        </div>

        {/* Columna 2: Nosotros */}
        <div className="footer-column">
          <h4>Nosotros</h4>
          <ul>
            <li>Sobre nosotros</li>
            <li>Sostenibilidad</li>
            <li>Corresponsalías</li>
            <li>Trabaja con nosotros</li>
            <li>Noticias</li>
            <li>Canal Ético</li>
          </ul>
        </div>

        {/* Columna 3: Legales */}
        <div className="footer-column">
          <h4>Legales</h4>
          <ul>
            <li>Tasas y tarifas</li>
            <li>Avisos Legales</li>
            <li>Lista de notarios</li>
          </ul>
        </div>

        {/* Columna 4: Ayuda y contacto */}
        <div className="footer-column">
          <h4>Ayuda y contacto</h4>
          <ul>
            <li>Puntos de atención</li>
            <li>Canales digitales</li>
            <li>Centro de ayuda</li>
            <li>Preguntas frecuentes</li>
            <li>Cronogramas de pagos</li>
          </ul>
        </div>

        {/* Columna 5: Contáctanos */}
        <div className="footer-column contact">
          <h4>Contáctanos</h4>
          <p>
            Por WhatsApp con Roti,
            <br />
            todos los días, las 24 horas
          </p>
          <div className="contact-info">
            <FaWhatsapp />
            <span>56 965656566</span>
          </div>
          <img src={secure} alt="Secure" className="secure-img" />
        </div>
      </div>

      <div className="footer-bottom">
        <span>@Copyright 2025 - Todos los derechos reservados</span>
        <span>Equipo de desarrollo</span>
      </div>
    </footer>
  );
};

export default Footer;
