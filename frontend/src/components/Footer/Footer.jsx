import { FaDollarSign, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <FaDollarSign className="logo-circle"/>
                    <p>
                        Impulsamos el crecimiento de las PYMES con crédito rápido y digital.
                        Agilidad financiera al alcance de tu negocio
                    </p>
                    <div>
                        <h2>Siguenos en:</h2>
                        <div className="socials">
                            <FaFacebookF />
                            <FaInstagram />
                            <FaLinkedinIn />
                            <SiX />
                        </div>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link-column">
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
                    <div className="link-column">
                        <h4>Legales</h4>
                        <ul>
                            <li>Sobre nosotros</li>
                            <li>Sostenibilidad</li>
                            <li>Corresponsalías</li>
                            <li>Trabaja con nosotros</li>
                            <li>Noticias</li>
                            <li>Canal Ético</li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h4>Ayuda y contacto</h4>
                        <ul>
                            <li>Sobre nosotros</li>
                            <li>Sostenibilidad</li>
                            <li>Corresponsalías</li>
                            <li>Trabaja con nosotros</li>
                            <li>Noticias</li>
                            <li>Canal Ético</li>
                        </ul>
                    </div>
                    <div className="link-column contact">
                        <h4>Contáctanos</h4>
                        <p>
                            Por WhatsApp con Roti, todos los días, las 24 horas
                        </p>
                        <div className="contact-info">
                            <FaWhatsapp />
                            <span>56 965656566</span>
                        </div>
                        <img src="./secure.png" alt="Secure" />
                    </div>
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