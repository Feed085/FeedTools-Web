import apiClient from './axios';

/**
 * Register a new user
 * @param {Object} userData - { username, email, password }
 * @returns {Promise}
 */
export const register = async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise}
 */
export const login = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

/**
 * Get current user profile
 * @returns {Promise}
 */
export const getMe = async () => {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
};

/**
 * Update user profile details
 * @param {Object} details - { username, avatar, banner }
 * @returns {Promise}
 */
export const updateProfile = async (details) => {
    const response = await apiClient.put('/auth/updatedetails', details);
    return response.data.data;
};
