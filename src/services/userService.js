// Mock user database
const mockUsers = [
  {
    id: 'user-001',
    fullName: 'Alice Admin',
    email: 'alice@drrcs.org',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-02-27T06:00:00Z',
    createdAt: '2025-01-10T09:00:00Z',
  },
  {
    id: 'user-002',
    fullName: 'Bob Volunteer',
    email: 'bob@drrcs.org',
    role: 'volunteer',
    status: 'active',
    lastLogin: '2026-02-26T14:30:00Z',
    createdAt: '2025-03-15T11:00:00Z',
  },
  {
    id: 'user-003',
    fullName: 'Carol Staff',
    email: 'carol@relief.org',
    role: 'organization_staff',
    status: 'active',
    lastLogin: '2026-02-25T08:45:00Z',
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    id: 'user-004',
    fullName: 'David Helper',
    email: 'david@drrcs.org',
    role: 'volunteer',
    status: 'inactive',
    lastLogin: '2026-01-10T12:00:00Z',
    createdAt: '2025-06-01T09:30:00Z',
  },
  {
    id: 'user-005',
    fullName: 'Eva Manager',
    email: 'eva@relief.org',
    role: 'organization_staff',
    status: 'active',
    lastLogin: '2026-02-27T07:00:00Z',
    createdAt: '2025-07-22T08:00:00Z',
  },
];

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Get all users, optionally filtered
export async function getAllUsers(token, filters = {}) {
  await delay();
  let result = [...mockUsers];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      u => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }
  if (filters.role && filters.role !== 'all') {
    result = result.filter(u => u.role === filters.role);
  }
  if (filters.status && filters.status !== 'all') {
    result = result.filter(u => u.status === filters.status);
  }

  return { success: true, users: result };
}

// Create a new user
export async function createUser(data, token) {
  await delay();
  if (!data.fullName || !data.email || !data.role) {
    return { success: false, message: 'Full name, email, and role are required.' };
  }
  if (mockUsers.find(u => u.email === data.email)) {
    return { success: false, message: 'A user with this email already exists.' };
  }
  const newUser = {
    id: 'user-' + Date.now(),
    fullName: data.fullName,
    email: data.email,
    role: data.role,
    status: 'active',
    lastLogin: null,
    createdAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return { success: true, user: newUser };
}

// Delete a user
export async function deleteUser(userId, token) {
  await delay();
  const index = mockUsers.findIndex(u => u.id === userId);
  if (index === -1) {
    return { success: false, message: 'User not found.' };
  }
  mockUsers.splice(index, 1);
  return { success: true };
}

// Change a user's role
export async function changeUserRole(userId, newRole, token) {
  await delay();
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: 'User not found.' };
  }
  user.role = newRole;
  return { success: true, user };
}

// Toggle a user's active/inactive status
export async function toggleUserStatus(userId, token) {
  await delay();
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: 'User not found.' };
  }
  user.status = user.status === 'active' ? 'inactive' : 'active';
  return { success: true, user };
}

// Reset a user's password (mock)
export async function resetUserPassword(userId, newPassword, token) {
  await delay();
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: 'User not found.' };
  }
  // In a real app, this would hash + store the new password
  return { success: true };
}