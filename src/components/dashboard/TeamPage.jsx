import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import './TeamPage.css';

const mockTeam = [
  { id: 't-001', fullName: 'Sarah Johnson', email: 'sarah@relief.org', role: 'Team Lead', status: 'active', phone: '+1-555-0201' },
  { id: 't-002', fullName: 'Michael Chen', email: 'michael@relief.org', role: 'Field Coordinator', status: 'active', phone: '+1-555-0202' },
  { id: 't-003', fullName: 'Lisa Martinez', email: 'lisa@relief.org', role: 'Logistics Officer', status: 'active', phone: '+1-555-0203' },
  { id: 't-004', fullName: 'Robert Wilson', email: 'robert@relief.org', role: 'Medical Liaison', status: 'inactive', phone: '+1-555-0204' },
];

const TeamPage = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e) => {
    e.preventDefault();
    alert(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInvite(false);
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <div>
          <h1>Team Members</h1>
          <p>Manage your organization&apos;s team and permissions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
          ✉️ Invite Member
        </button>
      </div>

      <Card elevation="elevated">
        <Card.Body>
          <div className="team-table-wrapper">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTeam.map(member => (
                  <tr key={member.id}>
                    <td>
                      <div className="team-member-info">
                        <div className="team-avatar">{member.fullName.charAt(0)}</div>
                        <div>
                          <div className="team-name">{member.fullName}</div>
                          <div className="team-email">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="team-role">{member.role}</td>
                    <td className="text-muted">{member.phone}</td>
                    <td>
                      <Badge variant={member.status === 'active' ? 'success' : 'default'}>
                        {member.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="team-actions">
                        <button className="btn-icon-action" title="Edit" onClick={() => alert(`Edit ${member.fullName}`)}>✏️</button>
                        <button className="btn-icon-action btn-icon-danger" title="Remove" onClick={() => alert(`Remove ${member.fullName}`)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="team-footer">
            <p className="team-count">{mockTeam.length} team members</p>
          </div>
        </Card.Body>
      </Card>

      {/* Invite modal */}
      {showInvite && (
        <div className="modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invite Team Member</h2>
              <button className="modal-close" onClick={() => setShowInvite(false)}>×</button>
            </div>
            <form onSubmit={handleInvite}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="inviteEmail">Email Address</label>
                  <input
                    id="inviteEmail"
                    type="email"
                    className="form-input"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    required
                    placeholder="colleague@organization.org"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowInvite(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
