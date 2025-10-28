import './Sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

import {
  FiHome,
  FiFileText,
  FiFolder,
  FiBarChart2,
  FiMessageSquare,
  FiHelpCircle,
  FiLogOut
} from 'react-icons/fi'

const Sidebar = ({ isOpen }) => {
  const { setTokenLogin } = useAppContext()
  const navigate = useNavigate()

  // Ítems del menú
  const menuItems = [
    { icon: <FiHome />, text: 'Panel principal', path: '/dashboard' },
    {
      icon: <FiFileText />,
      text: 'Mis solicitudes',
      path: '/dashboard'
    },
    {
      icon: <FiFolder />,
      text: 'Documentación',
      path: '/dashboard/solicitudes-todas'
    },
    {
      icon: <FiBarChart2 />,
      text: 'Estado de crédito',
      path: '/dashboard/estado-credito'
    },
    {
      icon: <FiMessageSquare />,
      text: 'Chats',
      path: '/dashboard/chats',
      disabled: true
    },
    {
      icon: <FiHelpCircle />,
      text: 'Ayuda',
      path: '/dashboard/ayuda',
      disabled: true
    }
  ]

  // Cierre de sesión
  const cerrarSesion = () => {
    setTokenLogin(null) // Limpio el token primero
    navigate('/', { replace: true }) // Luego voy a Home
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.disabled) {
            return (
              <div key={index} className="sidebar-link disabled">
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.text}</span>
              </div>
            )
          }
          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === '/dashboard'}
              className="sidebar-link"
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.text}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer" onClick={cerrarSesion}>
        <span className="sidebar-icon">
          <FiLogOut />
        </span>
        <span className="sidebar-text">Cerrar sesión</span>
      </div>
    </aside>
  )
}

export default Sidebar
