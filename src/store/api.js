import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

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

export const getPartner = async () => {
  const response = await apiClient.get('/partners');
  return response.data;
};



// Add other API methods here
export default apiClient;
