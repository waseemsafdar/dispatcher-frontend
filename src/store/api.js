import axios from 'axios';

const API_BASE_URL = 'https://example.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials) => {
  //const response = await apiClient.post('/login', credentials);
 // return response.data;
return true;
};

// Add other API methods here
export default apiClient;
