import apiRequest from './api';

// User registration
export const registerUser = async (userData) => {
  return await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// User login
export const loginUser = async (credentials) => {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Get current user profile (protected route)
export const getCurrentUser = async () => {
  return await apiRequest('/auth/me', {
    method: 'GET',
  });
};

// Logout (client-side only)
export const logoutUser = () => {
  localStorage.removeItem('userInfo');
  window.location.href = '/login';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return !!(userInfo && userInfo.token);
};

// Get stored user info
export const getStoredUserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};