/**
 * Sidebar Navigation Component
 * Side navigation menu with role-based items
 */

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const MENU_ITEMS = {
  admin: [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'All Requests', icon: '📋', path: '/admin/requests' },
    { label: 'Volunteers', icon: '👥', path: '/admin/volunteers' },
    { label: 'Users', icon: '👤', path: '/admin/users' },
    { label: 'Analytics', icon: '📈', path: '/admin/analytics' },
    { label: 'Settings', icon: '⚙️', path: '/admin/settings' },
  ],
  volunteer: [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'My Tasks', icon: '✓', path: '/volunteer/tasks' },
    { label: 'Available Requests', icon: '📝', path: '/volunteer/requests' },
    { label: 'My Profile', icon: '👤', path: '/volunteer/profile' },
    { label: 'Help', icon: '❓', path: '/volunteer/help' },
  ],
  organization_staff: [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'Submit Request', icon: '➕', path: '/org/submit-request' },
    { label: 'My Requests', icon: '📋', path: '/org/requests' },
    { label: 'Team Members', icon: '👥', path: '/org/team' },
    { label: 'Settings', icon: '⚙️', path: '/org/settings' },
  ],
};

export const Sidebar = ({ isOpen, onClose, currentPath = '/dashboard' }) => {
  const { user, logout } = useAuth();

  const userRole = user?.role || 'volunteer';
  const menuItems = MENU_ITEMS[userRole] || MENU_ITEMS.volunteer;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
