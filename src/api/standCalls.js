import axiosInstance from './axiosInstance';

// Get stand details
export const getStandDetails = async (standId) => {
  try {
    const response = await axiosInstance.get(`/stands/${standId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPaginatedStands = async (page) => {
    return await axiosInstance.get(`/stands?page=${page}&limit=10`);
};
// Handle stand redirection
export const handleStandRedirection = async (standId) => {
  try {
    const response = await axiosInstance.get(`/stands/redirect/${standId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Generate bulk stands
export const generateBulkStands = async (bulkData) => {
  try {
    const response = await axiosInstance.post('/stands/generate-bulk', bulkData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reset a stand
export const resetStand = async (standId) => {
  try {
    const response = await axiosInstance.post(`/stands/reset/${standId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Unlink a stand
export const unlinkStand = async (standId) => {
  try {
    const response = await axiosInstance.post(`/stands/unlink/${standId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Link a business to a stand
export const linkBusinessToStand = async (standId, businessData) => {
  try {
    const response = await axiosInstance.post(`/stands/link/${standId}`, businessData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all stands
export const getAllStands = async () => {
  try {
    const response = await axiosInstance.get('/stands/stands');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
