// frontend/src/services/authService.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Add authorization header if token exists
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  // Add body if it exists (for POST, PUT requests)
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// User registration
export const registerUser = async (userData) => {
  return await apiRequest('/auth/signup', {
    method: 'POST',
    body: userData,
  });
};

// User login
export const loginUser = async (credentials) => {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
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
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  return !!(userInfo && userInfo.token);
};

// Get stored user info
export const getStoredUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem('userInfo') || 'null');
  } catch (error) {
    console.error('Error parsing user info from localStorage:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  return await apiRequest('/auth/profile', {
    method: 'PUT',
    body: userData,
  });
};

// Verify JWT token validity
export const verifyToken = async () => {
  try {
    const userInfo = getStoredUserInfo();
    if (!userInfo || !userInfo.token) {
      return false;
    }
    
    // Try to fetch protected user data to verify token
    await getCurrentUser();
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    logoutUser();
    return false;
  }
};