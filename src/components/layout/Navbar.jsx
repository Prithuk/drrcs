import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../common/ThemeToggle';
import './Navbar.css';

export const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger Menu Button */}
        <button
          className="navbar-toggle"
          onClick={() => onMenuToggle?.()}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo/Brand */}
        <div className="navbar-brand">
          <h1>DRRCS</h1>
        </div>

        {/* Right Side - User Menu */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <div className="navbar-action">
            <ThemeToggle />
          </div>
          
          {/* Notifications */}
          <div className="navbar-action">
            <button className="notification-bell" aria-label="View notifications" onClick={() => navigate('/notifications')}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>
          </div>

          {/* User Profile Menu */}
          <div className="navbar-action user-menu">
            <button
              className="user-menu-toggle"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Toggle user menu"
            >
              <div className="user-avatar">{user?.fullName?.charAt(0) || 'U'}</div>
              <span className="user-name">{user?.fullName || 'User'}</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="menu-header">
                  <div className="user-info">
                    <div className="user-avatar-large">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="user-name-full">{user?.fullName}</div>
                      <div className="user-email">{user?.email}</div>
                      <div className="user-role">{user?.role}</div>
                    </div>
                  </div>
                </div>

                <div className="menu-divider"></div>

                <button className="menu-item" onClick={() => { setShowUserMenu(false); navigate('/profile'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile Settings
                </button>

                <button className="menu-item" onClick={() => { setShowUserMenu(false); navigate(user?.role === 'admin' ? '/admin/settings' : (user?.role === 'organization_staff' ? '/org/settings' : '/volunteer/help')); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                  More Options
                </button>

                <div className="menu-divider"></div>

                <button className="menu-item menu-item-danger" onClick={handleLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
