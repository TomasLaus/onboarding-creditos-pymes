import { useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <DashboardHeader toggleSidebar={toggleSidebar} />

      <Sidebar isOpen={isSidebarOpen} />
      
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
