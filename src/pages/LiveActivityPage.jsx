import React from 'react';
import { Link } from 'react-router-dom';

const LiveActivityPage = () => {
  return (
    <main className="home-page" style={{ padding: '64px 20px', textAlign: 'center' }}>
      <h1>Live Activity</h1>
      <p style={{ margin: '12px 0 24px' }}>
        This page is coming soon and will show live weather and disaster activity updates.
      </p>
      <Link to="/" className="public-auth-link public-auth-link-primary">
        Back to Home
      </Link>
    </main>
  );
};

export default LiveActivityPage;
