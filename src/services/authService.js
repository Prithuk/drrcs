const MOCK_DELAY = 1000;

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
    fullName: 'Demo Admin',
    email: 'admin@drrcs.test',
    password: 'Admin@123456', // Never store plain text in real app!
    role: 'admin',
  },
  {
    id: '2',
    fullName: 'Demo Volunteer',
    email: 'volunteer@drrcs.test',
    password: 'Volunteer@123',
    role: 'volunteer',
  },
  {
    id: '3',
    fullName: 'Demo Organization',
    email: 'org@drrcs.test',
    password: 'Organization@123',
    role: 'organization_staff',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateMockToken = (user) => {
  const tokenData = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400,
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
    await sleep(MOCK_DELAY);

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

    const token = generateMockToken(user);

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

export const registerUser = async (fullName, email, password, role) => {
  try {
    await sleep(MOCK_DELAY);

    const existingUser = MOCK_USERS.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        token: null,
        user: null,
        message: 'Email already registered. Please use a different email or log in.',
      };
    }

    const validRoles = ['admin', 'volunteer', 'organization_staff'];
    if (!validRoles.includes(role)) {
      return {
        success: false,
        token: null,
        user: null,
        message: 'Invalid role selected',
      };
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      fullName,
      email: email.toLowerCase(),
      password,
      role,
    };

    MOCK_USERS.push(newUser);

    const token = generateMockToken(newUser);

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

export const forgotPassword = async (email) => {
  try {
    await sleep(MOCK_DELAY);

    const user = MOCK_USERS.find((u) => u.email === email.toLowerCase());

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

export const logoutUser = async () => {
  try {
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

export const getCurrentUser = async (token) => {
  try {
    await sleep(MOCK_DELAY / 2);

    if (!token) {
      return {
        success: false,
        user: null,
        message: 'No token provided',
      };
    }

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
