import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 
import { FaDollarSign, FaWhatsapp, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-container">
           <FaDollarSign className="dollar-sign-icon" />
        </div>

        <nav className="main-nav">
          <ul>
            <li><Link to="/productos">PRODUCTOS</Link></li>
            <li><Link to="/zona-digital">ZONA DIGITAL</Link></li>
            <li><Link to="/alianzas">ALIANZAS</Link></li>
            <li><Link to="/ayuda">AYUDA Y CONTACTO</Link></li>
          </ul>
        </nav>

        <div className="actions-container">

          <FaWhatsapp className="action-icon whatsapp-icon" />
          <FaSearch className="action-icon search-icon" />

          <button className="btn btn-primary">SOLICITA TU CRÉDITO</button>
          <button className="btn btn-secondary">BANCA POR INTERNET</button>
        </div>
      </div>
    </header>
  );
};

export default Header;