import React, { useState } from 'react'
import './DashboardHeader.css'
import { FiSearch, FiBell, FiChevronDown, FiChevronUp } from 'react-icons/fi' // Importa FiChevronUp
import logo from '../../assets/logo_fintech-pyme.png'
import { useAppContext } from '../../context/appContext'

const DashboardHeader = () => {
  // Estado para controlar si el menú está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // Estado para saber qué ítem está activo (con fondo verde)
  const [activeItem, setActiveItem] = useState(null)

  const { setTokenLogin, userData } = useAppContext()

  // Función para manejar el clic en un ítem del menú
  const handleItemClick = itemName => {
    setActiveItem(itemName)
    // Opcional: cerrar el menú después de hacer clic
    // setIsDropdownOpen(false);
    setTokenLogin(null)
  }

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <img src={logo} alt="Fintech Pyme" className="header-logo" />
      </div>
      <div className="header-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Buscar" />
        </div>
        <div className="user-menu">
          <FiBell className="notification-icon" />
          {/* Contenedor del botón y el menú desplegable */}
          <div className="user-dropdown-container">
            {/* Botón que abre/cierra el menú */}
            <div
              className={`user-info ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{userData.legalName}</span>
              {/* Cambia el icono según el estado del menú */}
              {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {/* Menú desplegable (se muestra condicionalmente) */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className={`dropdown-item ${
                    activeItem === 'perfil' ? 'active' : ''
                  }`}
                  onClick={() => handleItemClick('perfil')}
                >
                  Mi perfil
                </button>
                <button
                  className={`dropdown-item ${
                    activeItem === 'config' ? 'active' : ''
                  }`}
                  onClick={() => handleItemClick('config')}
                >
                  Configuraciones
                </button>
                <button
                  className={`dropdown-item ${
                    activeItem === 'seguridad' ? 'active' : ''
                  }`}
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

export default DashboardHeader
