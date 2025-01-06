import axiosInstance from './axiosInstance';

// Get analytics for a specific stand
export const getStandAnalytics = async (standId) => {
  try {
    const response = await axiosInstance.get(`/analytics/stand/${standId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get analytics for a specific user
export const getUserAnalytics = async (userId) => {
  try {
    const response = await axiosInstance.get(`/analytics/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
