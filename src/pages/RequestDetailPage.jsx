import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import './RequestDetailPage.css';

const REQUEST_FORM_PAYLOADS_KEY = 'drrcs_request_form_payloads';

const readStoredFormPayload = (requestId) => {
  try {
    const raw = localStorage.getItem(REQUEST_FORM_PAYLOADS_KEY);
    if (!raw) return null;
    const payloads = JSON.parse(raw);
    return payloads[requestId] || null;
  } catch {
    return null;
  }
};

const RequestDetailPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [formPayload, setFormPayload] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const requestData = await api.getRequestById(id);
        setRequest(requestData);
        setFormPayload(readStoredFormPayload(id));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <div className="request-detail-page"><p>Loading request details...</p></div>;
  }

  if (!request) {
    return (
      <div className="request-detail-page">
        <div className="request-detail-card">
          <h1>Request Not Found</h1>
          <p>The request you are trying to view does not exist.</p>
          <Link to="/admin/requests" className="request-detail-back-link">Back to All Requests</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="request-detail-page">
      <div className="request-detail-header">
        <div>
          <h1>Request Details</h1>
          <p>Complete submitted request information</p>
        </div>
        <Link to="/admin/requests" className="request-detail-back-link">Back to All Requests</Link>
      </div>

      <div className="request-detail-grid">
        <section className="request-detail-card">
          <h2>Request Summary</h2>
          <dl className="request-detail-list">
            <div><dt>Request ID</dt><dd>{request.id}</dd></div>
            <div><dt>Status</dt><dd>{request.status}</dd></div>
            <div><dt>Priority</dt><dd>{request.priority}</dd></div>
            <div><dt>Disaster Type</dt><dd>{request.disasterType}</dd></div>
            <div><dt>Category</dt><dd>{request.category}</dd></div>
            <div><dt>Submitted</dt><dd>{new Date(request.timestamp).toLocaleString()}</dd></div>
            <div><dt>Location</dt><dd>{request.location?.address || 'N/A'}</dd></div>
            <div><dt>Contact Name</dt><dd>{request.contactName || 'N/A'}</dd></div>
            <div><dt>Contact Phone</dt><dd>{request.contactPhone || 'N/A'}</dd></div>
          </dl>
        </section>

        <section className="request-detail-card">
          <h2>Description</h2>
          <p className="request-detail-description">{request.description || 'No description available.'}</p>
        </section>

        {formPayload && (
          <section className="request-detail-card request-detail-full-width">
            <h2>Full Submitted Form Data</h2>
            <div className="request-detail-sections">
              <div>
                <h3>Basic Information</h3>
                <p><strong>Title:</strong> {formPayload.title || 'N/A'}</p>
                <p><strong>Description:</strong> {formPayload.description || 'N/A'}</p>
                <p><strong>Disaster Type:</strong> {formPayload.disasterType || 'N/A'}</p>
              </div>

              <div>
                <h3>Location</h3>
                <p><strong>State:</strong> {formPayload.location?.state || 'N/A'}</p>
                <p><strong>City:</strong> {formPayload.location?.city || 'N/A'}</p>
                <p><strong>Latitude:</strong> {formPayload.location?.latitude || 'N/A'}</p>
                <p><strong>Longitude:</strong> {formPayload.location?.longitude || 'N/A'}</p>
                <p><strong>Affected Area:</strong> {formPayload.location?.affectedAreaSize || 'N/A'}</p>
              </div>

              <div>
                <h3>Contact</h3>
                <p><strong>Primary Name:</strong> {formPayload.contact?.primaryName || 'N/A'}</p>
                <p><strong>Primary Phone:</strong> {formPayload.contact?.primaryPhone || 'N/A'}</p>
                <p><strong>Primary Email:</strong> {formPayload.contact?.primaryEmail || 'N/A'}</p>
                <p><strong>Backup Name:</strong> {formPayload.contact?.backupName || 'N/A'}</p>
                <p><strong>Backup Phone:</strong> {formPayload.contact?.backupPhone || 'N/A'}</p>
              </div>

              <div>
                <h3>Authorization</h3>
                <p><strong>Authorized By:</strong> {formPayload.authorizedBy || 'N/A'}</p>
                <p><strong>Authorization Date:</strong> {formPayload.authorizationDate || 'N/A'}</p>
                <p><strong>Urgency Reason:</strong> {formPayload.urgencyReason || 'N/A'}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RequestDetailPage;
