import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-header-wrapper">
        <DashboardHeader />
      </div>
      <div className="dashboard-body">
        <div className="dashboard-sidebar-wrapper">
          <Sidebar />
        </div>
        <main className="dashboard-content">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;