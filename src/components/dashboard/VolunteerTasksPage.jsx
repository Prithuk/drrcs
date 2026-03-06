import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import './VolunteerTasksPage.css';

const mockTasks = [
  {
    id: 'task-001',
    title: 'Flood rescue – Houston',
    description: 'Assist in extracting a family of 4 stranded on the second floor due to rising flood waters. Bring rescue boat.',
    priority: 'critical',
    status: 'in-progress',
    location: '123 River Street, Houston, TX',
    deadline: '2026-02-27T14:00:00Z',
    requestId: 'REQ-2026-001',
  },
  {
    id: 'task-002',
    title: 'Medical aid – Oklahoma City',
    description: 'Provide first aid to elderly couple with minor injuries from tornado debris.',
    priority: 'medium',
    status: 'assigned',
    location: '654 Main Street, Oklahoma City, OK',
    deadline: '2026-02-27T18:00:00Z',
    requestId: 'REQ-2026-005',
  },
  {
    id: 'task-003',
    title: 'Shelter setup – Miami',
    description: 'Help set up emergency shelter for 6 displaced hurricane victims.',
    priority: 'high',
    status: 'completed',
    location: '789 Beach Road, Miami, FL',
    deadline: '2026-02-26T12:00:00Z',
    requestId: 'REQ-2026-003',
  },
];

const priorityVariant = { critical: 'danger', high: 'warning', medium: 'info', low: 'success' };
const statusVariant = { 'in-progress': 'warning', assigned: 'info', completed: 'success', pending: 'default' };

const VolunteerTasksPage = () => {
  const [filter, setFilter] = useState('all');
  const tasks = filter === 'all' ? mockTasks : mockTasks.filter(t => t.status === filter);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1>My Tasks</h1>
          <p>Emergency assignments you are responsible for</p>
        </div>
      </div>

      {/* Summary */}
      <div className="tasks-summary">
        <button className={`summary-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All ({mockTasks.length})
        </button>
        <button className={`summary-chip ${filter === 'in-progress' ? 'active' : ''}`} onClick={() => setFilter('in-progress')}>
          In Progress ({mockTasks.filter(t => t.status === 'in-progress').length})
        </button>
        <button className={`summary-chip ${filter === 'assigned' ? 'active' : ''}`} onClick={() => setFilter('assigned')}>
          Assigned ({mockTasks.filter(t => t.status === 'assigned').length})
        </button>
        <button className={`summary-chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
          Completed ({mockTasks.filter(t => t.status === 'completed').length})
        </button>
      </div>

      {/* Task list */}
      <div className="tasks-list">
        {tasks.length === 0 && (
          <Card elevation="default">
            <Card.Body>
              <div className="tasks-empty">
                <div className="empty-icon">✅</div>
                <h3>No tasks</h3>
                <p>No tasks match the selected filter.</p>
              </div>
            </Card.Body>
          </Card>
        )}
        {tasks.map(task => (
          <Card key={task.id} elevation="default">
            <Card.Body>
              <div className="task-card">
                <div className="task-card-header">
                  <div className="task-card-title">{task.title}</div>
                  <div className="task-card-badges">
                    <Badge variant={priorityVariant[task.priority] || 'default'}>{task.priority}</Badge>
                    <Badge variant={statusVariant[task.status] || 'default'}>{task.status}</Badge>
                  </div>
                </div>
                <p className="task-card-desc">{task.description}</p>
                <div className="task-card-meta">
                  <span>📍 {task.location}</span>
                  <span>⏰ Due: {new Date(task.deadline).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="task-card-id">{task.requestId}</span>
                </div>
                <div className="task-card-actions">
                  {task.status !== 'completed' && (
                    <button className="btn btn-primary btn-sm" onClick={() => alert(`Updating task ${task.id}`)}>
                      {task.status === 'assigned' ? '▶ Start Task' : '✓ Mark Complete'}
                    </button>
                  )}
                  <button className="btn btn-secondary btn-sm" onClick={() => alert(`Viewing task ${task.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteerTasksPage;
