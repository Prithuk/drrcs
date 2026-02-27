import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>My Profile</h1>
      <p style={{ color: 'var(--color-muted-foreground)' }}>View your account details.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Account</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8, columnGap: 12 }}>
            <div style={{ color: 'var(--color-muted-foreground)' }}>Full Name</div>
            <div>{user?.fullName}</div>
            <div style={{ color: 'var(--color-muted-foreground)' }}>Email</div>
            <div>{user?.email}</div>
            <div style={{ color: 'var(--color-muted-foreground)' }}>Role</div>
            <div style={{ textTransform: 'capitalize' }}>{user?.role?.replace('_',' ')}</div>
          </div>
        </div>

        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Security</h3>
          <button style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-muted)', cursor: 'pointer' }}
            onClick={() => alert('Password reset flow will be implemented later.')}
          >Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
