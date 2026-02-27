// User service functions

// Function to add a user
function addUser(user) {
  // Validate the user input
  if (!user.password || user.password !== user.confirmPassword) {
    throw new Error('Passwords do not match!');
  }
  // Store the user in the mock database
  mockUserDatabase.push({ username: user.username, password: user.password });
}

// Function to reset password
function resetPassword(username, newPassword) {
  const user = mockUserDatabase.find(u => u.username === username);
  if (user) {
    user.password = newPassword;
  } else {
    throw new Error('User not found!');
  }
}

// Exports
export { addUser, resetPassword };