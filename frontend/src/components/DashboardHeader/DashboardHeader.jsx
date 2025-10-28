import React, { useState } from 'react'
import './DashboardHeader.css'
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiChevronUp } from 'react-icons/fi' 
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo_fintech-pyme.png'
import { useAppContext } from '../../context/appContext'

const DashboardHeader = ({ toggleSidebar }) => { 
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const { setTokenLogin, userData } = useAppContext()
  const navigate = useNavigate()

  const handleItemClick = itemName => {
    if (itemName === 'cerrar') {
      setActiveItem(itemName)
      setTokenLogin(null)
    } else if (itemName === 'perfil') {
      setActiveItem(itemName)
      navigate('/dashboard')
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <button className="mobile-menu-button" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <img src={logo} alt="Fintech Pyme" className="header-logo" />
      </div>
      <div className="header-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Buscar" />
        </div>
        <div className="user-menu">
          <FiBell className="notification-icon" />
          <div className="user-dropdown-container">
            <div
              className={`user-info ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{userData.legalName}</span>
              {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className={`dropdown-item ${
                    activeItem === 'perfil' ? 'active' : ''
                  }`}
                  // Redirige al dashboard
                  onClick={() => handleItemClick('perfil')}
                >
                  Mi perfil
                </button>
                <button
                  className={`dropdown-item ${
                    activeItem === 'config' ? 'active' : ''
                  }`}
                  disabled
                  onClick={() => handleItemClick('config')}
                >
                  Configuraciones
                </button>
                <button
                  className={`dropdown-item ${
                    activeItem === 'seguridad' ? 'active' : ''
                  }`}
                  disabled
                  onClick={() => handleItemClick('seguridad')}
                >
                  Claves y seguridad
                </button>
                <button
                  className={`dropdown-item ${
                    activeItem === 'cerrar' ? 'active' : ''
                  }`}

                  onClick={() => handleItemClick('cerrar')}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader;
