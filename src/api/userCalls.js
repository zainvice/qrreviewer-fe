import axiosInstance from './axiosInstance';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Request OTP
export const requestOtp = async (emailData) => {
  try {
    const response = await axiosInstance.post('/user/request-otp', emailData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Verify OTP
export const verifyOtp = async (otpData) => {
  try {
    const response = await axiosInstance.post('/user/verify-otp', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all users (Admin)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/user/admin/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a user (Admin)
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/user/admin/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
