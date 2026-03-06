/**
 * Request Service
 * API service for disaster request submission and management
 */

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
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        // Validate that required fields are present
        if (!requestData.title || !requestData.description || !requestData.disasterType) {
          reject({
            success: false,
            message: 'Missing required fields',
            errors: ['title', 'description', 'disasterType']
          });
          return;
        }

        // Simulate successful submission
        const requestId = generateRequestId();
        const response = {
          success: true,
          requestId: requestId,
          message: `Request ${requestId} submitted successfully`,
          timestamp: new Date().toISOString(),
          status: 'pending',
          data: {
            requestId: requestId,
            ...requestData,
            submittedAt: new Date().toISOString(),
            status: 'pending'
          }
        };

        resolve(response);
      } catch (error) {
        reject({
          success: false,
          message: 'Failed to submit request',
          error: error.message
        });
      }
    }, 1000); // Simulate 1 second network delay
  });
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
