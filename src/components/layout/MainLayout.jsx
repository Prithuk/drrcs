import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import './MainLayout.css';

// Main app layout with navbar and sidebar
export const MainLayout = ({ children, currentPath = '/dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-layout-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath={currentPath} />
        <main className="main-content" id="main-content" tabIndex="-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
