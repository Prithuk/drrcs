import React, { useState } from 'react';

const initial = [
  { id: 'n1', title: 'New request assigned', body: 'You have been assigned to Request #4572', read: false, ts: Date.now() - 1000*60*12 },
  { id: 'n2', title: 'System maintenance', body: 'Planned maintenance tonight 11pm–12am', read: false, ts: Date.now() - 1000*60*60*3 },
  { id: 'n3', title: 'Welcome to DRRCS', body: 'Thanks for joining the response team!', read: true, ts: Date.now() - 1000*60*60*26 },
];

const NotificationsPage = () => {
  const [items, setItems] = useState(initial);

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ marginBottom: 8 }}>Notifications</h1>
        <button onClick={markAllRead} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-card)', cursor: 'pointer' }}>Mark all as read</button>
      </div>
      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {items.map(n => (
          <div key={n.id} style={{ padding: 16, border: '1px solid var(--color-border)', borderRadius: 8, background: 'var(--color-card)', opacity: n.read ? 0.7 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{n.title}</strong>
              <span style={{ color: 'var(--color-muted-foreground)', fontSize: 12 }}>{new Date(n.ts).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 6 }}>{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
