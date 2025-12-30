const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  tasks: {
    base: `${API_BASE_URL}/tasks`,
    byId: (id) => `${API_BASE_URL}/tasks/${id}`,
  },
};

export default api;
