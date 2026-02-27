import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import './VolunteersPage.css';

const mockVolunteers = [
  { id: 'v-001', fullName: 'James Rivera', email: 'james@drrcs.org', skills: ['First Aid', 'Search & Rescue'], status: 'active', assignedTasks: 3, completedTasks: 12, location: 'Houston, TX' },
  { id: 'v-002', fullName: 'Maria Gonzalez', email: 'maria@drrcs.org', skills: ['Medical', 'Logistics'], status: 'active', assignedTasks: 1, completedTasks: 8, location: 'Miami, FL' },
  { id: 'v-003', fullName: 'Tom Baker', email: 'tom@drrcs.org', skills: ['Evacuation', 'Driving'], status: 'available', assignedTasks: 0, completedTasks: 5, location: 'Dallas, TX' },
  { id: 'v-004', fullName: 'Priya Patel', email: 'priya@drrcs.org', skills: ['Medical', 'Communication'], status: 'active', assignedTasks: 2, completedTasks: 19, location: 'Los Angeles, CA' },
  { id: 'v-005', fullName: 'Derek Stone', email: 'derek@drrcs.org', skills: ['Construction', 'Logistics'], status: 'off-duty', assignedTasks: 0, completedTasks: 7, location: 'New Orleans, LA' },
  { id: 'v-006', fullName: 'Angela White', email: 'angela@drrcs.org', skills: ['Counseling', 'First Aid'], status: 'available', assignedTasks: 0, completedTasks: 3, location: 'Atlanta, GA' },
];

const statusVariant = { active: 'success', available: 'info', 'off-duty': 'default' };

const VolunteersPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockVolunteers.filter(v => {
    const q = search.toLowerCase();
    const matchesSearch = !q || v.fullName.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.skills.some(s => s.toLowerCase().includes(q));
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalActive = mockVolunteers.filter(v => v.status === 'active').length;
  const totalAvailable = mockVolunteers.filter(v => v.status === 'available').length;
  const totalTasks = mockVolunteers.reduce((sum, v) => sum + v.completedTasks, 0);

  return (
    <div className="volunteers-page">
      <div className="volunteers-header">
        <div>
          <h1>Volunteers</h1>
          <p>Manage and monitor volunteer assignments</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Invite volunteer flow coming soon.')}>
          ➕ Invite Volunteer
        </button>
      </div>

      {/* Summary cards */}
      <div className="volunteers-stats">
        <Card elevation="elevated">
          <Card.Body>
            <div className="vol-stat">
              <div className="vol-stat-value">{mockVolunteers.length}</div>
              <div className="vol-stat-label">Total Volunteers</div>
            </div>
          </Card.Body>
        </Card>
        <Card elevation="elevated">
          <Card.Body>
            <div className="vol-stat">
              <div className="vol-stat-value success">{totalActive}</div>
              <div className="vol-stat-label">Active Now</div>
            </div>
          </Card.Body>
        </Card>
        <Card elevation="elevated">
          <Card.Body>
            <div className="vol-stat">
              <div className="vol-stat-value info">{totalAvailable}</div>
              <div className="vol-stat-label">Available</div>
            </div>
          </Card.Body>
        </Card>
        <Card elevation="elevated">
          <Card.Body>
            <div className="vol-stat">
              <div className="vol-stat-value">{totalTasks}</div>
              <div className="vol-stat-label">Tasks Completed</div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Filters */}
      <Card elevation="flat">
        <Card.Body>
          <div className="vol-filters">
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Name, email, or skill..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="available">Available</option>
                <option value="off-duty">Off-duty</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setStatusFilter('all'); }}>Clear</button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card elevation="elevated">
        <Card.Body>
          {filtered.length === 0 ? (
            <div className="vol-empty">
              <div className="empty-icon">🙋</div>
              <h3>No volunteers found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="vol-table-wrapper">
              <table className="vol-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Active Tasks</th>
                    <th>Completed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(vol => (
                    <tr key={vol.id}>
                      <td>
                        <div className="vol-info">
                          <div className="vol-avatar">{vol.fullName.charAt(0)}</div>
                          <div>
                            <div className="vol-name">{vol.fullName}</div>
                            <div className="vol-email">{vol.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="vol-skills">
                          {vol.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <Badge variant={statusVariant[vol.status] || 'default'}>
                          {vol.status}
                        </Badge>
                      </td>
                      <td className="text-muted">{vol.location}</td>
                      <td className="text-center">{vol.assignedTasks}</td>
                      <td className="text-center">{vol.completedTasks}</td>
                      <td>
                        <div className="vol-actions">
                          <button className="btn-icon-action" title="View profile" onClick={() => alert(`Profile for ${vol.fullName}`)}>👁️</button>
                          <button className="btn-icon-action" title="Assign task" onClick={() => alert(`Assign task to ${vol.fullName}`)}>📋</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="vol-footer">
            <p className="vol-count">Showing {filtered.length} of {mockVolunteers.length} volunteers</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VolunteersPage;
