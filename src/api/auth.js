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

/**
 * Verify OTP code
 * @param {string} email
 * @param {string} code
 * @returns {Promise}
 */
export const verifyCode = async (email, code) => {
    const response = await apiClient.post('/auth/verify', { email, code });
    return response.data;
};

/**
 * Resend OTP code
 * @param {string} email
 * @returns {Promise}
 */
export const resendOtpCode = async (email) => {
    const response = await apiClient.post('/auth/resend-code', { email });
    return response.data;
};
