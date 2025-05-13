import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add any auth token here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const getCountries = async (offset = 0) => {
  const response = await api.get('/countries', { params: { offset } });
  // Ensure we have a consistent data format regardless of API source
  if (response && response.data) {
    // Add flagImageUri if missing
    response.data = response.data.map(country => ({
      ...country,
      id: country.id || country.code || '',
      flagImageUri: country.flagImageUri || (country.code ? 
        `https://flagcdn.com/${(country.code || '').toLowerCase()}.svg` : null)
    }));
  }
  return {
    data: response.data || [],
    metadata: response.metadata || { totalCount: response.data?.length || 0, currentOffset: offset }
  };
};

export const getCities = async (countryId, offset = 0) => {
  const response = await api.get('/cities', { params: { countryId, offset } });
  // Ensure we have a consistent data format regardless of API source
  return {
    data: response.data || [],
    metadata: response.metadata || { totalCount: response.data?.length || 0, currentOffset: offset }
  };
};

export const getCityDetails = async (cityId) => {
  try {
    const response = await api.get(`/cities/${cityId}`);
    return response;
  } catch (error) {
    console.error('Error fetching city details:', error);
    throw error;
  }
};

export default api;
