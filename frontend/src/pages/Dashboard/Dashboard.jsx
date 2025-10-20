import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardView from '../../components/DashboardView/DashboardView';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="dashboard-body">
        <Sidebar />
        <DashboardView />
      </div>
    </div>
  );
};

export default Dashboard;
