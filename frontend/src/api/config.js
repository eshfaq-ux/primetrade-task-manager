/**
 * API Configuration
 * Centralized API endpoints and base URL configuration
 */

// Base API URL - can be configured via environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * API endpoint configuration object
 * Organizes all API endpoints by feature
 */
export const api = {
  // Authentication endpoints
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  // Task management endpoints
  tasks: {
    base: `${API_BASE_URL}/tasks`,
    byId: (id) => `${API_BASE_URL}/tasks/${id}`, // Dynamic endpoint for specific task
  },
};

export default api;
