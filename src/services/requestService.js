/**
 * Request Service
 * API service for disaster request submission and management
 */

import { api } from '../lib/api';
import { createRequestSubmittedNotification } from './notificationService';

const REQUEST_FORM_PAYLOADS_KEY = 'drrcs_request_form_payloads';
const TRACKING_INDEX_KEY = 'drrcs_tracking_index';
const REQUESTS_STORAGE_KEY = 'drrcs_requests_store';

const normalizePhone = (value) => (value || '').trim().replace(/\D/g, '');

const saveRequestFormPayload = (requestId, requestData) => {
  try {
    const existing = localStorage.getItem(REQUEST_FORM_PAYLOADS_KEY);
    const payloads = existing ? JSON.parse(existing) : {};
    payloads[requestId] = {
      ...requestData,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(REQUEST_FORM_PAYLOADS_KEY, JSON.stringify(payloads));
  } catch {
    // Ignore payload persistence failures in mock mode
  }
};

/**
 * Save a mapping so users can look up a request by its ID, email, or phone.
 */
const saveTrackingIndex = (requestId, email, phone) => {
  try {
    const existing = localStorage.getItem(TRACKING_INDEX_KEY);
    const index = existing ? JSON.parse(existing) : {};
    const normalizedEmail = email?.trim().toLowerCase() || null;
    const normalizedPhone = phone?.trim().replace(/\D/g, '') || null;

    // Store full info keyed by requestId
    index[requestId] = {
      requestId,
      email: normalizedEmail,
      phone: normalizedPhone,
      submittedAt: new Date().toISOString(),
    };

    // Reverse lookup by email and phone
    if (normalizedEmail) index[normalizedEmail] = requestId;
    if (normalizedPhone) index[normalizedPhone] = requestId;

    localStorage.setItem(TRACKING_INDEX_KEY, JSON.stringify(index));
  } catch { /* ignore */ }
};

/**
 * Generate a unique request ID
 * @returns {string} - Unique request ID in format REQ-YYYYMMDD-XXXXX
 */
const generateRequestId = () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `REQ-${date}-${random}`;
};

/**
 * Submit a new disaster request
 * @param {object} requestData - The request data to submit
 * @returns {Promise} - Promise resolving to response object
 */
export const submitRequest = async (requestData) => {
  // Validate required fields early for consistent UI error handling
  if (!requestData.title || !requestData.description || !requestData.disasterType) {
    throw {
      success: false,
      message: 'Missing required fields',
      errors: ['title', 'description', 'disasterType']
    };
  }

  const resolveCategory = (resourceNeeds = {}) => {
    if (resourceNeeds.medical?.needed) return 'medical';
    if (resourceNeeds.shelter?.needed) return 'shelter';
    if (resourceNeeds.food?.needed) return 'food';
    if (resourceNeeds.searchRescue?.needed) return 'rescue';
    return 'other';
  };

  const resolvePriority = (priority) => {
    const supported = new Set(['critical', 'high', 'medium', 'low']);
    return supported.has(priority) ? priority : 'medium';
  };

  try {
    const createdRequest = await api.createRequest({
      disasterType: requestData.disasterType,
      category: resolveCategory(requestData.resourceNeeds),
      priority: resolvePriority(requestData.priority),
      status: 'pending',
      location: {
        address: [requestData.location?.city, requestData.location?.state].filter(Boolean).join(', ') || 'Location not specified'
      },
      description: requestData.description,
      contactName: requestData.contact?.primaryName || requestData.authorizedBy || 'Unknown Contact',
      contactPhone: requestData.contact?.primaryPhone || 'N/A',
      notes: requestData.title
    });

    saveRequestFormPayload(createdRequest.id, requestData);
    saveTrackingIndex(
      createdRequest.id,
      requestData.contact?.primaryEmail,
      requestData.contact?.primaryPhone
    );
    createRequestSubmittedNotification(createdRequest);

    return {
      success: true,
      requestId: createdRequest.id,
      message: `Request ${createdRequest.id} submitted successfully`,
      timestamp: createdRequest.timestamp,
      status: createdRequest.status,
      data: {
        requestId: createdRequest.id,
        ...requestData,
        submittedAt: createdRequest.timestamp,
        status: createdRequest.status
      }
    };
  } catch (error) {
    throw {
      success: false,
      message: 'Failed to submit request',
      error: error?.message || String(error)
    };
  }
};

/**
 * Look up a request by tracking ID, email, or phone number.
 * Available publicly — no authentication required.
 *
 * @param {string} query - Request ID, email address, or phone number
 */
export const trackRequest = async (query) => {
  const trimmed = (query || '').trim();
  if (!trimmed) {
    return { success: false, message: 'Please enter a tracking ID, email, or phone number.' };
  }

  try {
    const indexData = localStorage.getItem(TRACKING_INDEX_KEY);
    const index = indexData ? JSON.parse(indexData) : {};

    // Resolve request ID from the query
    let requestId = trimmed;
    const normalizedQuery = trimmed.toLowerCase();
    const digitsOnly = normalizePhone(trimmed);

    if (index[trimmed]) {
      const val = index[trimmed];
      requestId = typeof val === 'string' ? val : val.requestId;
    } else if (index[normalizedQuery]) {
      const val = index[normalizedQuery];
      requestId = typeof val === 'string' ? val : val.requestId;
    } else if (digitsOnly && index[digitsOnly]) {
      const val = index[digitsOnly];
      requestId = typeof val === 'string' ? val : val.requestId;
    }

    // Try to get the stored payload
    const payloadData = localStorage.getItem(REQUEST_FORM_PAYLOADS_KEY);
    const payloads = payloadData ? JSON.parse(payloadData) : {};
    const payload = payloads[requestId];

    // Try the same request store used by the dashboard/api mock layer
    const apiData = localStorage.getItem(REQUESTS_STORAGE_KEY);
    const apiRequests = apiData ? JSON.parse(apiData) : [];
    const apiRequest = apiRequests.find((request) => {
      const requestIdMatches = request.id === requestId || request.id?.toLowerCase() === normalizedQuery;
      const requestPhoneMatches = normalizePhone(request.contactPhone) && normalizePhone(request.contactPhone) === digitsOnly;
      return requestIdMatches || requestPhoneMatches;
    });

    // If index lookup failed, allow direct request-id search against stored requests and payloads.
    const resolvedRequestId = apiRequest?.id || payload?.requestId || requestId;

    if (!payload && !apiRequest) {
      return {
        success: false,
        message:
          'No request found with that information. Please double-check your tracking ID, email, or phone number.',
      };
    }

    return {
      success: true,
      request: {
        id: resolvedRequestId,
        status: apiRequest?.status || 'pending',
        priority: apiRequest?.priority || payload?.priority || 'medium',
        disasterType: apiRequest?.disasterType || payload?.disasterType || 'unknown',
        location:
          apiRequest?.location?.address ||
          [payload?.location?.city, payload?.location?.state].filter(Boolean).join(', ') ||
          'Not specified',
        contactName:
          apiRequest?.contactName || payload?.contact?.primaryName || 'N/A',
        assignedTo: apiRequest?.assignedTo || null,
        submittedAt: apiRequest?.timestamp || payload?.savedAt || null,
        updatedAt: apiRequest?.updatedAt || null,
        description: apiRequest?.description || payload?.description || '',
        notes: apiRequest?.notes || payload?.title || '',
      },
    };
  } catch {
    return { success: false, message: 'Failed to retrieve request. Please try again.' };
  }
};

/**
 * Get request by ID
 * @param {string} requestId - The request ID
 * @returns {Promise} - Promise resolving to request data
 */
export const getRequest = async (requestId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock data for demonstration
      const mockRequest = {
        requestId: requestId,
        title: 'Sample Disaster Request',
        description: 'This is a sample disaster relief request for demonstration purposes.',
        disasterType: 'earthquake',
        status: 'in-review',
        priority: 'high',
        location: {
          state: 'California',
          city: 'San Francisco',
          latitude: 37.7749,
          longitude: -122.4194,
          affectedAreaSize: '50 sq km'
        },
        resourceNeeds: {
          food: { needed: true, people: 500, dietary: 'Vegetarian and gluten-free options needed' },
          medical: { needed: true, supplies: ['first-aid-kits', 'antibiotics'], hospitalAvailable: true },
          shelter: { needed: true, families: 100, requirements: 'Family units with children' },
          searchRescue: { needed: false, missing: 0, description: '' },
          other: 'Generators for emergency power'
        },
        contact: {
          primaryName: 'John Doe',
          primaryPhone: '(555) 123-4567',
          primaryEmail: 'john@example.com',
          backupName: 'Jane Smith',
          backupPhone: '(555) 234-5678'
        },
        organizationName: 'Relief Organization Inc',
        organizationType: 'NGO',
        authorizedBy: 'Sarah Johnson',
        authorizationDate: '2026-02-16',
        submittedAt: '2026-02-17T10:30:00Z',
        createdAt: '2026-02-17T10:30:00Z',
        updatedAt: '2026-02-17T11:00:00Z'
      };

      resolve(mockRequest);
    }, 500);
  });
};

/**
 * Get all requests for a user/organization
 * @param {object} options - Filter options (organizationId, status, priority, etc.)
 * @returns {Promise} - Promise resolving to array of requests
 */
export const getRequests = async (options = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock data for demonstration
      const mockRequests = [
        {
          requestId: 'REQ-20260217-ABC12',
          title: 'Earthquake Relief - San Francisco',
          disasterType: 'earthquake',
          status: 'in-review',
          priority: 'high',
          location: { state: 'California', city: 'San Francisco' },
          submittedAt: '2026-02-17T10:30:00Z'
        },
        {
          requestId: 'REQ-20260216-DEF45',
          title: 'Flood Response - Houston Area',
          disasterType: 'flood',
          status: 'approved',
          priority: 'critical',
          location: { state: 'Texas', city: 'Houston' },
          submittedAt: '2026-02-16T15:20:00Z'
        },
        {
          requestId: 'REQ-20260215-GHI78',
          title: 'Wildfire Evacuation Support',
          disasterType: 'wildfire',
          status: 'pending',
          priority: 'medium',
          location: { state: 'Oregon', city: 'Portland' },
          submittedAt: '2026-02-15T08:45:00Z'
        }
      ];

      resolve(mockRequests);
    }, 500);
  });
};

/**
 * Update an existing request
 * @param {string} requestId - The request ID
 * @param {object} updateData - Data to update
 * @returns {Promise} - Promise resolving to updated request
 */
export const updateRequest = async (requestId, updateData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updatedRequest = {
        requestId: requestId,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      resolve(updatedRequest);
    }, 500);
  });
};

/**
 * Delete a request
 * @param {string} requestId - The request ID
 * @returns {Promise} - Promise resolving to confirmation
 */
export const deleteRequest = async (requestId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Request ${requestId} deleted successfully`
      });
    }, 500);
  });
};

/**
 * Save request as draft (to localStorage for now)
 * @param {string} draftKey - Key to store draft under
 * @param {object} formData - Form data to save
 */
export const saveDraft = (draftKey, formData) => {
  try {
    localStorage.setItem(`draft_${draftKey}`, JSON.stringify({
      data: formData,
      savedAt: new Date().toISOString()
    }));
    return { success: true, message: 'Draft saved' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Load request draft from localStorage
 * @param {string} draftKey - Key to retrieve draft from
 * @returns {object} - Draft data or null
 */
export const loadDraft = (draftKey) => {
  try {
    const draft = localStorage.getItem(`draft_${draftKey}`);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Clear request draft from localStorage
 * @param {string} draftKey - Key to delete draft from
 */
export const clearDraft = (draftKey) => {
  try {
    localStorage.removeItem(`draft_${draftKey}`);
    return { success: true, message: 'Draft cleared' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get request status history
 * @param {string} requestId - The request ID
 * @returns {Promise} - Promise resolving to status history array
 */
export const getRequestStatusHistory = async (requestId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const history = [
        { status: 'pending', timestamp: '2026-02-17T10:30:00Z', note: 'Request submitted' },
        { status: 'in-review', timestamp: '2026-02-17T11:00:00Z', note: 'Under review by admin' },
        { status: 'approved', timestamp: '2026-02-17T14:00:00Z', note: 'Approved for relief dispatch' }
      ];
      resolve(history);
    }, 500);
  });
};

export default {
  submitRequest,
  getRequest,
  getRequests,
  updateRequest,
  deleteRequest,
  saveDraft,
  loadDraft,
  clearDraft,
  getRequestStatusHistory
};
