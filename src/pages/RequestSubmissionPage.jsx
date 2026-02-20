/**
 * Request Submission Page Component
 * Page container for the request submission form
 */

import React, { useState } from 'react';
import RequestForm from '../components/requests/RequestForm';
import { Card } from '../components/common/Card';
import './RequestSubmissionPage.css';

const RequestSubmissionPage = ({ onNavigate }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSuccess = (response) => {
    setSuccessMessage(response);
    
    // Show success message for 3 seconds, then optionally redirect
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('dashboard');
      }
    }, 3000);
  };

  const handleFormCancel = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  if (successMessage) {
    return (
      <div className="request-submission-page success">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Request Submitted Successfully!</h2>
          <p>Your disaster relief request has been submitted.</p>
          <div className="request-id">
            <strong>Request ID:</strong>
            <span>{successMessage.requestId}</span>
          </div>
          <p className="redirect-message">Redirecting to dashboard in a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-submission-page">
      <div className="page-header">
        <h1>Submit Disaster Relief Request</h1>
        <p>Please provide detailed information about your organization's relief needs.</p>
      </div>

      <div className="page-content">
        <div className="form-container">
          <RequestForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </div>

        {/* Help/Information Panel */}
        <aside className="help-panel">
          <Card>
            <Card.Header>
              <h3>📋 Tips for Submission</h3>
            </Card.Header>
            <Card.Body>
              <ul>
                <li><strong>Be Specific:</strong> Provide detailed descriptions to help responders understand your needs</li>
                <li><strong>Include Details:</strong> Specify quantities and special requirements for resources</li>
                <li><strong>Contact Information:</strong> Ensure contact details are accurate and monitored</li>
                <li><strong>Verify Data:</strong> Double-check all information before submitting</li>
                <li><strong>Save Drafts:</strong> Use the Save Draft button to preserve your progress</li>
                <li><strong>Disaster Type:</strong> Select the type of disaster accurately for proper categorization</li>
              </ul>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h3>❓ Need Help?</h3>
            </Card.Header>
            <Card.Body>
              <p>If you have questions about the submission process:</p>
              <ul>
                <li>📞 Call our support team: 1-800-HELP-NOW</li>
                <li>📧 Email: support@drrcs.org</li>
                <li>💬 Live chat available 24/7</li>
              </ul>
            </Card.Body>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default RequestSubmissionPage;
