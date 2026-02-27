/**
 * User Management Service
 * Handles CRUD operations for user management
 * Backend integration ready for Week 9
 */

// Mock delay to simulate network latency
const MOCK_DELAY = 800;

// Import mock users from authService (in real app, this would be a database)
import { loginUser } from './authService';

// Internal mock user database (shared with authService in production)
let mockUserDatabase = [
  {
    id: '1',
    fullName: 'Hlay Aliotte',
    email: 'hlayaliotte@lewisu.edu',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T10:00:00Z',
    lastLogin: '2026-02-25T08:30:00Z',
  },
  {
    id: '2',
    fullName: 'Prithu Kathet',
    email: 'prithukathet@lewisu.edu',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-16T11:00:00Z',
    lastLogin: '2026-02-24T14:20:00Z',
  },
  {
    id: '3',
    fullName: 'Sree Soumith Thanigondala',
    email: 'sreesoumiththanigo@lewisu.edu',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-17T09:00:00Z',
    lastLogin: '2026-02-23T16:45:00Z',
  },
  {
    id: '4',
    fullName: 'John Volunteer',
    email: 'john.volunteer@example.com',
    role: 'volunteer',
    status: 'active',
    createdAt: '2025-02-01T12:00:00Z',
    lastLogin: '2026-02-20T10:15:00Z',
  },
  {
    id: '5',
    fullName: 'Sarah Organizer',
    email: 'sarah.org@example.com',
    role: 'organization_staff',
    status: 'active',
    createdAt: '2025-02-10T14:30:00Z',
    lastLogin: '2026-02-22T09:00:00Z',
  },
  {
    id: '6',
    fullName: 'Mike Helper',
    email: 'mike.helper@example.com',
    role: 'volunteer',
    status: 'inactive',
    createdAt: '2025-01-20T08:00:00Z',
    lastLogin: '2026-01-15T11:30:00Z',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all users
 * GET /api/users
 * 
 * @param {string} token - Authentication token
 * @param {object} filters - Optional filters (role, status, search)
 * @returns {Promise} - { success: boolean, users: array, message: string }
 */
export const getAllUsers = async (token, filters = {}) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        users: [],
        message: 'Authentication required',
      };
    }

    let filteredUsers = [...mockUserDatabase];

    // Apply role filter
    if (filters.role && filters.role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role);
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    return {
      success: true,
      users: filteredUsers,
      total: filteredUsers.length,
      message: 'Users retrieved successfully',
    };
  } catch (error) {
    console.error('Get users error:', error);
    return {
      success: false,
      users: [],
      message: 'Failed to retrieve users',
    };
  }
};

/**
 * Get user by ID
 * GET /api/users/:id
 * 
 * @param {string} userId - User ID
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const getUserById = async (userId, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'Authentication required',
      };
    }

    const user = mockUserDatabase.find(u => u.id === userId);

    if (!user) {
      return {
        success: false,
        user: null,
        message: 'User not found',
      };
    }

    return {
      success: true,
      user,
      message: 'User retrieved successfully',
    };
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to retrieve user',
    };
  }
};

/**
 * Create new user
 * POST /api/users
 * 
 * @param {object} userData - User data (fullName, email, role)
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const createUser = async (userData, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'Authentication required',
      };
    }

    // Validate required fields
    if (!userData.fullName || !userData.email || !userData.role) {
      return {
        success: false,
        user: null,
        message: 'Missing required fields',
      };
    }

    // Check if email already exists
    const existingUser = mockUserDatabase.find(u => u.email === userData.email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        user: null,
        message: 'Email already exists',
      };
    }

    // Create new user
    const newUser = {
      id: String(mockUserDatabase.length + 1),
      fullName: userData.fullName,
      email: userData.email.toLowerCase(),
      role: userData.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    mockUserDatabase.push(newUser);

    return {
      success: true,
      user: newUser,
      message: 'User created successfully',
    };
  } catch (error) {
    console.error('Create user error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to create user',
    };
  }
};

/**
 * Update user
 * PUT /api/users/:id
 * 
 * @param {string} userId - User ID
 * @param {object} updates - Fields to update
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const updateUser = async (userId, updates, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'Authentication required',
      };
    }

    const userIndex = mockUserDatabase.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        user: null,
        message: 'User not found',
      };
    }

    // Check if email is being changed and if it already exists
    if (updates.email && updates.email !== mockUserDatabase[userIndex].email) {
      const existingUser = mockUserDatabase.find(u => u.email === updates.email.toLowerCase());
      if (existingUser) {
        return {
          success: false,
          user: null,
          message: 'Email already exists',
        };
      }
    }

    // Update user
    mockUserDatabase[userIndex] = {
      ...mockUserDatabase[userIndex],
      ...updates,
      email: updates.email ? updates.email.toLowerCase() : mockUserDatabase[userIndex].email,
    };

    return {
      success: true,
      user: mockUserDatabase[userIndex],
      message: 'User updated successfully',
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to update user',
    };
  }
};

/**
 * Delete user
 * DELETE /api/users/:id
 * 
 * @param {string} userId - User ID
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, message: string }
 */
export const deleteUser = async (userId, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
      };
    }

    const userIndex = mockUserDatabase.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // Remove user from database
    mockUserDatabase.splice(userIndex, 1);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      message: 'Failed to delete user',
    };
  }
};

/**
 * Change user role
 * PATCH /api/users/:id/role
 * 
 * @param {string} userId - User ID
 * @param {string} newRole - New role (admin, volunteer, organization_staff)
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const changeUserRole = async (userId, newRole, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'Authentication required',
      };
    }

    const validRoles = ['admin', 'volunteer', 'organization_staff'];
    if (!validRoles.includes(newRole)) {
      return {
        success: false,
        user: null,
        message: 'Invalid role',
      };
    }

    const userIndex = mockUserDatabase.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        user: null,
        message: 'User not found',
      };
    }

    // Update role
    mockUserDatabase[userIndex].role = newRole;

    return {
      success: true,
      user: mockUserDatabase[userIndex],
      message: 'Role changed successfully',
    };
  } catch (error) {
    console.error('Change role error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to change role',
    };
  }
};

/**
 * Toggle user status (active/inactive)
 * PATCH /api/users/:id/status
 * 
 * @param {string} userId - User ID
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const toggleUserStatus = async (userId, token) => {
  try {
    await sleep(MOCK_DELAY);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'Authentication required',
      };
    }

    const userIndex = mockUserDatabase.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        user: null,
        message: 'User not found',
      };
    }

    // Toggle status
    mockUserDatabase[userIndex].status = 
      mockUserDatabase[userIndex].status === 'active' ? 'inactive' : 'active';

    return {
      success: true,
      user: mockUserDatabase[userIndex],
      message: `User ${mockUserDatabase[userIndex].status === 'active' ? 'activated' : 'deactivated'} successfully`,
    };
  } catch (error) {
    console.error('Toggle status error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to toggle user status',
    };
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole,
  toggleUserStatus,
};
