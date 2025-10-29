import { useState, useRef, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(82); // Altura por defecto para hacer uso del useRef
  const headerRef = useRef(null); // Referencia para el header

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Efecto para medir la altura del header y actualizarla si cambia el tamaño de la ventana
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateHeight);
    updateHeight(); // Medir la altura inicial

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Aquí pasamos la altura medida al DashboardHeader */}
      <DashboardHeader toggleSidebar={toggleSidebar} ref={headerRef} />

      {/* Pasamos la altura medida al Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} headerHeight={headerHeight} />
      
      <main className="main-content">
        <Outlet />
      </main>

      <div 
        className={`overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default DashboardLayout;
