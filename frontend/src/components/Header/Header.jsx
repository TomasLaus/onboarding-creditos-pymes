import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { FaWhatsapp, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo_fintech-pyme.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
    setMenuOpen(false);
  };
  
  const handleLoginClick = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-container">
           <Link to="/">
             <img src={logo} alt="Fintech Pyme Logo" className="logo-image" />
           </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <div className={menuOpen ? "nav-actions-container active" : "nav-actions-container"}>
            <nav className="main-nav">
              <ul>
                <li><Link to="/productos" onClick={handleLinkClick}>Productos</Link></li>
                <li><Link to="/zona-digital" onClick={handleLinkClick}>Zona Digital</Link></li>
                <li><Link to="/alianzas" onClick={handleLinkClick}>Alianzas</Link></li>
                <li><Link to="/ayuda" onClick={handleLinkClick}>Ayuda y Contacto</Link></li>
              </ul>
            </nav>
            <div className="actions-container">
              <FaWhatsapp className="action-icono whatsapp-icon" />
              <FaSearch className="action-icono search-icon" />
              <button className="btn btn-primary" onClick={handleRegisterClick}>Solicita tu Crédito</button>
              <button className="btn btn-secondary" onClick={handleLoginClick}>Iniciar Sesión</button>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;