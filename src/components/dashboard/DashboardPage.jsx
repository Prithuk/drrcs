import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../common/Card';
import Badge from '../common/Badge';
import StatusIndicator from '../common/StatusIndicator';
import './DashboardPage.css';

const AdminDashboard = ({ user }) => (
  <>
    <div className="dashboard-welcome">
      <h1>Welcome, {user?.fullName ?? 'Admin'}!</h1>
      <p>System Administrator Dashboard</p>
    </div>

    {/* Stats Cards */}
    <div className="dashboard-grid">
      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-label">Total Requests</div>
              <div className="stat-value">24</div>
              <div className="stat-meta">+3 this week</div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-label">Active Volunteers</div>
              <div className="stat-value">156</div>
              <div className="stat-meta">+8 new</div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <div className="stat-label">Organizations</div>
              <div className="stat-value">12</div>
              <div className="stat-meta">All active</div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-label">System Health</div>
              <div className="stat-value">99.8%</div>
              <div className="stat-meta">Healthy</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card elevation="default">
      <Card.Header>Recent Activity</Card.Header>
      <Card.Body>
        <div className="activity-list">
          {[
            { icon: '📝', action: 'New request submitted', time: '2 hours ago' },
            { icon: '👤', action: 'New volunteer registered', time: '4 hours ago' },
            { icon: '✓', action: 'Request completed', time: '1 day ago' },
          ].map((item, i) => (
            <div key={i} className="activity-item">
              <span className="activity-icon">{item.icon}</span>
              <div className="activity-content">
                <div className="activity-action">{item.action}</div>
                <div className="activity-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  </>
);

const VolunteerDashboard = ({ user }) => (
  <>
    <div className="dashboard-welcome">
      <h1>Welcome, {user?.fullName ?? 'Volunteer'}!</h1>
      <p>Volunteer Dashboard</p>
    </div>

    {/* Stats */}
    <div className="dashboard-grid">
      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-label">Tasks Completed</div>
              <div className="stat-value">12</div>
              <div className="stat-meta">This month</div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-label">Available Tasks</div>
              <div className="stat-value">7</div>
              <div className="stat-meta">Ready for you</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>

    {/* Status */}
    <Card elevation="default">
      <Card.Header>Your Status</Card.Header>
      <Card.Body>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
            Availability
          </div>
          <StatusIndicator status="available" label="Available" />
        </div>
      </Card.Body>
    </Card>
  </>
);

const OrganizationDashboard = ({ user }) => (
  <>
    <div className="dashboard-welcome">
      <h1>Welcome, {user?.fullName ?? 'Staff'}!</h1>
      <p>Organization Dashboard</p>
    </div>

    {/* Stats */}
    <div className="dashboard-grid">
      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-label">My Requests</div>
              <div className="stat-value">5</div>
              <div className="stat-meta">2 pending</div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card elevation="elevated">
        <Card.Body>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-label">Team Members</div>
              <div className="stat-value">8</div>
              <div className="stat-meta">All active</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>

    {/* Quick Actions */}
    <Card elevation="default">
      <Card.Header>Quick Actions</Card.Header>
      <Card.Body>
        <div className="quick-actions">
          <button className="action-button">
            <span>➕</span> Submit New Request
          </button>
          <button className="action-button">
            <span>📋</span> View My Requests
          </button>
        </div>
      </Card.Body>
    </Card>
  </>
);

// Main Dashboard Page
export const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'volunteer':
        return <VolunteerDashboard user={user} />;
      case 'organization_staff':
        return <OrganizationDashboard user={user} />;
      default:
        return <VolunteerDashboard user={user} />;
    }
  };

  return <div className="dashboard-page">{renderDashboard()}</div>;
};

export default DashboardPage;
