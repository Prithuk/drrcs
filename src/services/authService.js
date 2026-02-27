/**
 * Authentication Service with Mocked API Calls
 * This service handles all authentication-related API calls
 * Backend integration ready for Week 9
 */

// Mock delay to simulate network latency
const MOCK_DELAY = 1000; // 1 second

// Browser-compatible base64 encoding/decoding
const btoa_compat = (str) => {
  try {
    return btoa(JSON.stringify(str));
  } catch {
    return btoa(unescape(encodeURIComponent(JSON.stringify(str))));
  }
};

const atob_compat = (str) => {
  try {
    return JSON.parse(atob(str));
  } catch {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  }
};

// Mock user database for testing
const MOCK_USERS = [
  {
    id: '1',
    fullName: 'Hlay Aliotte',
    email: 'hlayaliotte@lewisu.edu',
    password: 'Password@123',
    role: 'admin',
  },
  {
    id: '2',
    fullName: 'Prithu Kathet',
    email: 'prithukathet@lewisu.edu',
    password: 'Password@123',
    role: 'admin',
  },
  {
    id: '3',
    fullName: 'Sree Soumith Thanigondala',
    email: 'sreesoumiththanigo@lewisu.edu',
    password: 'Password@123',
    role: 'admin',
  },
  {
    id: '4',
    fullName: 'Admin Demo',
    email: 'admin@drrcs.test',
    password: 'Admin@123456',
    role: 'admin',
  },
  {
    id: '5',
    fullName: 'Volunteer Demo',
    email: 'volunteer@drrcs.test',
    password: 'Volunteer@123',
    role: 'volunteer',
  },
  {
    id: '6',
    fullName: 'Organization Demo',
    email: 'org@drrcs.test',
    password: 'Organization@123',
    role: 'organization_staff',
  },
  {
    id: '7',
    fullName: 'Sowjanya Gottimukkala',
    email: 'sowjigottimukkala96@gmail.com',
    password: 'Password@123',
    role: 'admin',
  },
];

/**
 * Sleep utility for simulating async operations
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate mock JWT-like token (for testing only)
 */
const generateMockToken = (user) => {
  // Simple base64 encoding, NOT secure - for testing only
  const tokenData = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
  };
  return btoa_compat(tokenData);
};

/**
 * Login user with email/username and password
 * POST /api/auth/login
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} rememberMe - Remember this device
 * @returns {Promise} - { success: boolean, token: string, user: object, message: string }
 */
export const loginUser = async (email, password, rememberMe = false) => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY);

    // Find user in mock database
    const user = MOCK_USERS.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return {
        success: false,
        token: null,
        user: null,
        message: 'Invalid email or password',
      };
    }

    // Generate mock token
    const token = generateMockToken(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      token,
      user: userWithoutPassword,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      token: null,
      user: null,
      message: 'An error occurred during login. Please try again.',
    };
  }
};

/**
 * Register new user
 * POST /api/auth/register
 *
 * @param {string} fullName - User full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role (admin, volunteer, organization_staff)
 * @returns {Promise} - { success: boolean, token: string, user: object, message: string }
 */
export const registerUser = async (fullName, email, password, role) => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY);

    // Check if email already exists (mock unique constraint)
    const existingUser = MOCK_USERS.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        token: null,
        user: null,
        message: 'Email already registered. Please use a different email or log in.',
      };
    }

    // Validate role
    const validRoles = ['admin', 'volunteer', 'organization_staff'];
    if (!validRoles.includes(role)) {
      return {
        success: false,
        token: null,
        user: null,
        message: 'Invalid role selected',
      };
    }

    // Create new user (in real app, backend would create this)
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      fullName,
      email: email.toLowerCase(),
      password, // Never store plain text in real app!
      role,
    };

    // Add to mock database
    MOCK_USERS.push(newUser);

    // Generate token
    const token = generateMockToken(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      token,
      user: userWithoutPassword,
      message: 'Registration successful!',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      token: null,
      user: null,
      message: 'An error occurred during registration. Please try again.',
    };
  }
};

/**
 * Request password reset
 * POST /api/auth/forgot-password
 *
 * @param {string} email - User email
 * @returns {Promise} - { success: boolean, message: string }
 */
export const forgotPassword = async (email) => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY);

    // Check if email exists (don't reveal if it exists or not for security)
    const user = MOCK_USERS.find((u) => u.email === email.toLowerCase());

    // Always return success message for security (don't reveal if email exists)
    return {
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions.',
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
};

/**
 * Mock refresh token
 * POST /api/auth/refresh
 *
 * @param {string} token - Current token
 * @returns {Promise} - { success: boolean, token: string, message: string }
 */
export const refreshToken = async (token) => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY / 2);

    // In a real app, validate and refresh the token
    // For now, just return a new token
    if (!token) {
      return {
        success: false,
        token: null,
        message: 'No token provided',
      };
    }

    // Decode mock token
    const decoded = atob_compat(token);

    // Generate new token with updated expiry
    const tokenData = {
      ...decoded,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    };
    const newToken = btoa_compat(tokenData);

    return {
      success: true,
      token: newToken,
      message: 'Token refreshed',
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return {
      success: false,
      token: null,
      message: 'Failed to refresh token',
    };
  }
};

/**
 * Logout user (mainly for cleanup)
 * POST /api/auth/logout
 *
 * @returns {Promise} - { success: boolean, message: string }
 */
export const logoutUser = async () => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY / 2);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'An error occurred during logout',
    };
  }
};

/**
 * Get current user (refresh user data from backend)
 * GET /api/auth/me
 *
 * @param {string} token - Authentication token
 * @returns {Promise} - { success: boolean, user: object, message: string }
 */
export const getCurrentUser = async (token) => {
  try {
    // Simulate network delay
    await sleep(MOCK_DELAY / 2);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'No token provided',
      };
    }

    // Decode token and return user data
    const decoded = atob_compat(token);
    const user = MOCK_USERS.find((u) => u.id === decoded.userId);

    if (!user) {
      return {
        success: false,
        user: null,
        message: 'User not found',
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      message: 'User data retrieved',
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      user: null,
      message: 'Failed to retrieve user data',
    };
  }
};

export default {
  loginUser,
  registerUser,
  forgotPassword,
  refreshToken,
  logoutUser,
  getCurrentUser,
};
